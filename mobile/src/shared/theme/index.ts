/**
 * Design tokens taken from the Attira Figma board (OutfitDetailScreen).
 */
export const palette = {
  background: '#F7F7F5',
  ink: '#121212',
  lime: '#D4FF1E',
  limeDeep: '#7BA80C',
  white: '#FFFFFF',
  darkCard: '#181818',
  muted: '#A3A3A3',
  divider: '#E6E6E2',
  danger: '#C0341D',
} as const;

export const spacing = {
  screenX: 20,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
} as const;

/**
 * The Figma uses "Space Grotesk" + "Inter". They are intentionally not bundled
 * (see README) — we fall back to the platform system font and rely on weight
 * and letter-spacing to keep the same character.
 */
export const typography = {
  eyebrow: { fontSize: 8.5, fontWeight: '700', letterSpacing: 2 },
  navTitle: { fontSize: 12.5, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { fontSize: 21, fontWeight: '800', letterSpacing: -0.3 },
  body: { fontSize: 12, lineHeight: 18 },
  button: { fontSize: 13, fontWeight: '700', letterSpacing: 1.6 },
} as const;
