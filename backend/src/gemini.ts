import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from './env';

export class UpstreamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UpstreamError';
  }
}

const PROMPT = (outfitName: string) =>
  [
    'You are AIRA, the in-app AI stylist for the fashion app Attira.',
    `A user just generated a virtual try-on of this outfit: "${outfitName}".`,
    'Write ONE punchy sentence (max 25 words) describing how the look works and when to wear it.',
    'Be specific and confident. No preamble, no quotes, no emojis, just the sentence.',
  ].join(' ');

/**
 * Ask Gemini for a one-sentence styling note for the given outfit.
 * Throws {@link UpstreamError} if the Gemini call fails or returns nothing usable.
 */
export async function generateStyleNote(outfitName: string): Promise<string> {
  const client = new GoogleGenerativeAI(env.GEMINI_API_KEY);
  const model = client.getGenerativeModel({ model: env.GEMINI_MODEL });

  let text: string;
  try {
    const result = await model.generateContent(PROMPT(outfitName));
    text = result.response.text().trim();
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new UpstreamError(`Gemini request failed: ${detail}`);
  }

  if (!text) {
    throw new UpstreamError('Gemini returned an empty styling note.');
  }

  // Collapse whitespace / strip wrapping quotes the model sometimes adds.
  return text.replace(/\s+/g, ' ').replace(/^["']|["']$/g, '').trim();
}
