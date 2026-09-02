export interface QuizQuestion {
  eyebrow: string;
  prompt: string;
  options: string[];
}

/** The 6-step Style Quiz from the Figma onboarding flow. */
export const quizQuestions: QuizQuestion[] = [
  { eyebrow: 'STYLE QUIZ', prompt: 'YOUR\nLIFESTYLE?', options: ['OFFICE', 'CREATIVE', 'ACTIVE', 'SOCIAL'] },
  { eyebrow: 'STYLE QUIZ', prompt: 'GO-TO\nSILHOUETTE?', options: ['TAILORED', 'OVERSIZED', 'FITTED', 'FLUID'] },
  { eyebrow: 'STYLE QUIZ', prompt: 'COLOUR\nINSTINCT?', options: ['MONOCHROME', 'EARTH TONES', 'BOLD POP', 'PASTELS'] },
  { eyebrow: 'STYLE QUIZ', prompt: 'FABRIC\nFEEL?', options: ['STRUCTURED', 'SOFT KNIT', 'DENIM', 'LEATHER'] },
  { eyebrow: 'STYLE QUIZ', prompt: 'WEEKEND\nMODE?', options: ['BRUNCH', 'GALLERY', 'TRAIL', 'NIGHT OUT'] },
  { eyebrow: 'STYLE QUIZ', prompt: 'STATEMENT\nPIECE?', options: ['THE BLAZER', 'THE BOOT', 'THE BAG', 'THE COAT'] },
];
