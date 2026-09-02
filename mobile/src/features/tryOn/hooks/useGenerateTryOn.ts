import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Outfit } from '../../outfit/model/types';
import { describeOutfit } from '../../outfit/data/monochromePowerOutfit';
import { useGenerateTryOnMutation } from '../api/tryOnApi';
import { selectLastTryOn } from '../model/selectors';
import { tryOnCleared, tryOnSucceeded } from '../model/tryOnSlice';
import type { PersistedTryOn, TryOnFailure } from '../model/types';

export type TryOnPhase = 'initial' | 'loading' | 'success' | 'error';

interface UseGenerateTryOn {
  phase: TryOnPhase;
  /** The result to render: the fresh one, or the persisted last one. */
  result?: PersistedTryOn;
  error?: TryOnFailure;
  generate: () => void;
  reset: () => void;
}

/**
 * Owns the full "Generate Try-On" interaction for one outfit:
 * fires the backend call, persists a successful result, and exposes a
 * single `phase` the screen can switch on.
 */
export const useGenerateTryOn = (outfit: Outfit): UseGenerateTryOn => {
  const dispatch = useAppDispatch();
  const persisted = useAppSelector(selectLastTryOn(outfit.id));

  const [trigger, mutation] = useGenerateTryOnMutation();

  const generate = useCallback(async () => {
    const outfitName = describeOutfit(outfit);
    try {
      const data = await trigger({ outfitName }).unwrap();
      dispatch(
        tryOnSucceeded(outfit.id, {
          ...data,
          outfitName,
        }),
      );
    } catch {
      // Error is already surfaced through `mutation.error`; nothing to do here.
    }
  }, [dispatch, outfit, trigger]);

  const reset = useCallback(() => {
    mutation.reset();
    dispatch(tryOnCleared({ outfitId: outfit.id }));
  }, [dispatch, mutation, outfit.id]);

  return useMemo<UseGenerateTryOn>(() => {
    if (mutation.isLoading) {
      return { phase: 'loading', result: persisted, generate, reset };
    }
    if (mutation.isError) {
      return {
        phase: 'error',
        result: persisted,
        error: mutation.error as TryOnFailure,
        generate,
        reset,
      };
    }

    const fresh: PersistedTryOn | undefined = mutation.data
      ? { ...mutation.data, outfitName: describeOutfit(outfit), generatedAt: Date.now() }
      : undefined;
    const result = fresh ?? persisted;

    return { phase: result ? 'success' : 'initial', result, generate, reset };
  }, [mutation.data, mutation.error, mutation.isError, mutation.isLoading, outfit, persisted, generate, reset]);
};
