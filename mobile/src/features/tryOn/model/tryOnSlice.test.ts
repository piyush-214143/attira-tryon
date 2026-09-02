import { tryOnCleared, tryOnReducer, tryOnSucceeded } from './tryOnSlice';

describe('tryOnSlice', () => {
  const empty = { lastByOutfit: {} };

  it('stores a successful try-on keyed by outfit id and stamps generatedAt', () => {
    const before = Date.now();
    const next = tryOnReducer(
      empty,
      tryOnSucceeded('monochrome-power', {
        status: 'completed',
        resultImageUrl: 'http://localhost:4000/static/mock-result.jpg',
        styleNote: 'Sharp monochrome tailoring built for the office.',
        outfitName: 'Monochrome Power — Oversized Blazer',
      }),
    );

    const saved = next.lastByOutfit['monochrome-power'];
    expect(saved.styleNote).toContain('monochrome');
    expect(saved.generatedAt).toBeGreaterThanOrEqual(before);
  });

  it('clears a stored try-on', () => {
    const populated = tryOnReducer(
      empty,
      tryOnSucceeded('monochrome-power', {
        status: 'completed',
        resultImageUrl: 'x',
        styleNote: 'y',
        outfitName: 'z',
      }),
    );

    const cleared = tryOnReducer(populated, tryOnCleared({ outfitId: 'monochrome-power' }));
    expect(cleared.lastByOutfit['monochrome-power']).toBeUndefined();
  });
});
