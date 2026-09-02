import path from 'path';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { env, isGeminiConfigured } from './env';
import { generateStyleNote, UpstreamError } from './gemini';

const app = express();
app.use(cors());
app.use(express.json());

// Serve the supplied mock try-on result image as a static asset.
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
app.use('/static', express.static(PUBLIC_DIR));

const MOCK_RESULT_PATH = '/static/mock-result.jpg';

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', geminiConfigured: isGeminiConfigured() });
});

/**
 * POST /api/try-on
 * Request:  { "outfitName": "White shirt and blue jeans" }
 * Success:  { "status": "completed", "resultImageUrl": "...", "styleNote": "..." }
 * Failure:  non-2xx + { "error": "...", "code": "..." }
 */
app.post('/api/try-on', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { outfitName } = req.body ?? {};

    if (typeof outfitName !== 'string' || outfitName.trim().length === 0) {
      return res.status(400).json({
        error: 'Field "outfitName" is required and must be a non-empty string.',
        code: 'INVALID_REQUEST',
      });
    }

    if (!isGeminiConfigured()) {
      return res.status(500).json({
        error: 'Server is missing GEMINI_API_KEY. Set it in the backend environment.',
        code: 'MISSING_API_KEY',
      });
    }

    const styleNote = await generateStyleNote(outfitName.trim());

    return res.json({
      status: 'completed',
      resultImageUrl: `${env.PUBLIC_BASE_URL}${MOCK_RESULT_PATH}`,
      styleNote,
    });
  } catch (err) {
    return next(err);
  }
});

// Central error handler -> always JSON, always non-2xx.
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof UpstreamError) {
    // eslint-disable-next-line no-console
    console.error('[try-on] upstream failure:', err.message);
    return res.status(502).json({
      error: 'The styling service is temporarily unavailable. Please try again.',
      code: 'UPSTREAM_ERROR',
    });
  }

  // eslint-disable-next-line no-console
  console.error('[try-on] unexpected error:', err);
  return res.status(500).json({ error: 'Something went wrong.', code: 'INTERNAL_ERROR' });
});

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Attira try-on backend listening on http://localhost:${env.PORT}`);
  if (!isGeminiConfigured()) {
    // eslint-disable-next-line no-console
    console.warn('WARNING: GEMINI_API_KEY is not set — /api/try-on will return 500 until it is.');
  }
});

export default app;
