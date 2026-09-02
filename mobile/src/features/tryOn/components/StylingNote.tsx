import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette, spacing } from '../../../shared/theme';
import type { TryOnPhase } from '../hooks/useGenerateTryOn';

interface StylingNoteProps {
  phase: TryOnPhase;
  /** Gemini's note once a try-on has completed. */
  styleNote?: string;
  /** The app's own static reasoning, shown before any try-on. */
  fallbackReasoning: string;
}

const StylingNote = ({ phase, styleNote, fallbackReasoning }: StylingNoteProps) => {
  const isResult = phase === 'success' && !!styleNote;

  const body =
    phase === 'loading'
      ? 'AIRA is writing your styling note…'
      : isResult
      ? styleNote
      : fallbackReasoning;

  return (
    <View style={styles.box}>
      <Text style={styles.label}>✦ {isResult ? 'AIRA STYLING NOTE' : 'AIRA REASONING'}</Text>
      <Text style={[styles.body, phase === 'loading' && styles.bodyMuted]}>{body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    marginHorizontal: spacing.screenX,
    marginTop: spacing.lg,
    backgroundColor: palette.lime,
    paddingHorizontal: 15,
    paddingVertical: 13,
    gap: spacing.sm,
  },
  label: { fontSize: 8.5, fontWeight: '700', letterSpacing: 1.7, color: palette.ink },
  body: { fontSize: 12, lineHeight: 18, color: palette.ink },
  bodyMuted: { opacity: 0.65 },
});

export default memo(StylingNote);
