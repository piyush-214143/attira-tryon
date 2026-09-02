import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../../shared/config';
import type { TryOnFailure, TryOnRequest, TryOnResult } from '../model/types';

interface BackendError {
  error?: string;
  code?: string;
}

/**
 * Turns whatever `fetchBaseQuery` produced into a stable {@link TryOnFailure}
 * so components never have to branch on RTK Query's error union.
 */
export const toFailure = (raw: unknown): TryOnFailure => {
  const err = raw as { status?: number | string; data?: BackendError };

  if (err?.status === 'FETCH_ERROR') {
    return { message: `Can't reach the server at ${config.apiBaseUrl}. Is the backend running?`, code: 'NETWORK' };
  }
  if (err?.status === 'TIMEOUT_ERROR') {
    return { message: 'The styling service took too long to respond. Please try again.', code: 'TIMEOUT' };
  }
  if (err?.data?.error) {
    return { message: err.data.error, code: err.data.code };
  }
  return { message: 'Something went wrong generating your try-on.', code: 'UNKNOWN' };
};

export const tryOnApi = createApi({
  reducerPath: 'tryOnApi',
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiBaseUrl,
    timeout: config.tryOnTimeoutMs,
  }),
  endpoints: builder => ({
    generateTryOn: builder.mutation<TryOnResult, TryOnRequest>({
      query: body => ({ url: '/api/try-on', method: 'POST', body }),
      transformErrorResponse: toFailure,
    }),
  }),
});

export const { useGenerateTryOnMutation } = tryOnApi;
