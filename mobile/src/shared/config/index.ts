import { Platform } from 'react-native';

/**
 * Runtime configuration.
 *
 * The backend base URL differs per platform when developing locally:
 * - iOS simulator reaches the host machine on `localhost`
 * - Android emulator reaches the host machine on `10.0.2.2`
 * - A physical device needs your machine's LAN IP — set `API_BASE_URL_OVERRIDE`
 *   below (and PUBLIC_BASE_URL on the backend so the image URL is reachable).
 *
 * Kept as a single edit point on purpose — no native env plugin to configure.
 */
const API_BASE_URL_OVERRIDE: string | undefined = undefined;

const resolveApiBaseUrl = (): string => {
  if (API_BASE_URL_OVERRIDE) {
    return API_BASE_URL_OVERRIDE;
  }
  return Platform.select({
    android: 'http://10.0.2.2:4000',
    ios: 'http://localhost:4000',
    default: 'http://localhost:4000',
  }) as string;
};

export const config = {
  apiBaseUrl: resolveApiBaseUrl(),
  /** Request timeout for the try-on call (Gemini can be slow-ish). */
  tryOnTimeoutMs: 25_000,
} as const;
