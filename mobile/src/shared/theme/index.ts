/**
 * Design tokens taken from the Attira Figma board.
 */
export const palette = {
  background: '#F7F7F5',
  ink: '#121212',
  lime: '#D4FF1E',
  limeDeep: '#7BA80C',
  white: '#FFFFFF',
  darkCard: '#181818',
  darkElevated: '#1F1F1F',
  muted: '#A3A3A3',
  mutedDark: '#6E6E6E',
  divider: '#E6E6E2',
  danger: '#C0341D',
  // Accent strips used on cards across the board.
  accentTeal: '#1E6E7A',
  accentOrange: '#FF8C5A',
  accentBlue: '#7FBBFF',
  accentPurple: '#B98CFF',
} as const;

export const spacing = {
  screenX: 20,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

/**
 * The Figma uses a heavy condensed display face + a rounded grotesque. They are
 * intentionally not bundled (see README) — we fall back to the platform system
 * font and lean on weight + letter-spacing to keep the same character.
 */
export const typography = {
  eyebrow: { fontSize: 8.5, fontWeight: '700', letterSpacing: 2 },
  navTitle: { fontSize: 12.5, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { fontSize: 21, fontWeight: '800', letterSpacing: -0.3 },
  display: { fontSize: 34, fontWeight: '800', letterSpacing: -0.5 },
  body: { fontSize: 12, lineHeight: 18 },
  button: { fontSize: 13, fontWeight: '700', letterSpacing: 1.6 },
} as const;
