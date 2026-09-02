/** Request body for POST /api/try-on */
export interface TryOnRequest {
  outfitName: string;
}

/** Successful response from POST /api/try-on */
export interface TryOnResult {
  status: 'completed';
  resultImageUrl: string;
  styleNote: string;
}

/** Normalised error shape surfaced to the UI. */
export interface TryOnFailure {
  message: string;
  code?: string;
}

/** A persisted successful try-on (survives app restarts via redux-persist). */
export interface PersistedTryOn extends TryOnResult {
  outfitName: string;
  generatedAt: number;
}
