import { toFailure } from './tryOnApi';

describe('toFailure', () => {
  it('maps a network failure to a friendly message', () => {
    expect(toFailure({ status: 'FETCH_ERROR', error: 'TypeError: Network request failed' })).toEqual({
      message: expect.stringContaining('Is the backend running?'),
      code: 'NETWORK',
    });
  });

  it('maps a timeout', () => {
    expect(toFailure({ status: 'TIMEOUT_ERROR' }).code).toBe('TIMEOUT');
  });

  it('passes through a structured backend error', () => {
    expect(
      toFailure({ status: 500, data: { error: 'Server is missing GEMINI_API_KEY.', code: 'MISSING_API_KEY' } }),
    ).toEqual({ message: 'Server is missing GEMINI_API_KEY.', code: 'MISSING_API_KEY' });
  });

  it('falls back for anything unexpected', () => {
    expect(toFailure(undefined).code).toBe('UNKNOWN');
  });
});
