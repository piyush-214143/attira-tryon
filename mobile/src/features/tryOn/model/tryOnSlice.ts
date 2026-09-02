import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PersistedTryOn } from './types';

interface TryOnState {
  /** Last successful try-on, keyed by outfit id. Persisted across restarts. */
  lastByOutfit: Record<string, PersistedTryOn>;
}

const initialState: TryOnState = {
  lastByOutfit: {},
};

const tryOnSlice = createSlice({
  name: 'tryOn',
  initialState,
  reducers: {
    tryOnSucceeded: {
      reducer(state, action: PayloadAction<{ outfitId: string; result: PersistedTryOn }>) {
        state.lastByOutfit[action.payload.outfitId] = action.payload.result;
      },
      prepare(outfitId: string, result: Omit<PersistedTryOn, 'generatedAt'>) {
        return { payload: { outfitId, result: { ...result, generatedAt: Date.now() } } };
      },
    },
    tryOnCleared(state, action: PayloadAction<{ outfitId: string }>) {
      delete state.lastByOutfit[action.payload.outfitId];
    },
  },
});

export const { tryOnSucceeded, tryOnCleared } = tryOnSlice.actions;
export const tryOnReducer = tryOnSlice.reducer;
