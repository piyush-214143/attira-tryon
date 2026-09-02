import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: parseInt(process.env.PORT ?? '4000', 10),
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? '',
  GEMINI_MODEL: process.env.GEMINI_MODEL ?? 'gemini-3.6-flash',
  /**
   * Public base URL the mobile client can reach this server on. Used to build
   * the absolute `resultImageUrl` that points at the bundled mock asset.
   * Defaults to localhost for the iOS simulator; override for a device / LAN.
   */
  PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? '4000'}`,
};

export const isGeminiConfigured = (): boolean => env.GEMINI_API_KEY.trim().length > 0;
