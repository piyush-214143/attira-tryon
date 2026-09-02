import type { RootState } from '../../../app/store';
import type { PersistedTryOn } from './types';

export const selectLastTryOn = (outfitId: string) =>
  (state: RootState): PersistedTryOn | undefined =>
    state.tryOn.lastByOutfit[outfitId];
