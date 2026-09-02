import React, { memo } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../shared/ui/AppButton';
import Tag from '../../../shared/ui/Tag';
import { palette, spacing, typography } from '../../../shared/theme';
import type { Outfit } from '../../outfit/model/types';
import type { TryOnPhase } from '../hooks/useGenerateTryOn';
import type { PersistedTryOn, TryOnFailure } from '../model/types';

interface TryOnStageProps {
  outfit: Outfit;
  phase: TryOnPhase;
  result?: PersistedTryOn;
  error?: TryOnFailure;
  onRetry: () => void;
}

const HERO_HEIGHT = 310;

const TryOnStage = ({ outfit, phase, result, error, onRetry }: TryOnStageProps) => {
  if (phase === 'error') {
    return (
      <View style={[styles.stage, styles.errorStage]}>
        <View style={styles.accent} />
        <Text style={styles.errorTitle}>TRY-ON FAILED</Text>
        <Text style={styles.errorMessage}>{error?.message ?? 'Please try again.'}</Text>
        <AppButton label="RETRY" variant="secondary" onPress={onRetry} style={styles.retryBtn} />
      </View>
    );
  }

  const showingResult = phase === 'success' && result;
  const imageSource = showingResult ? { uri: result.resultImageUrl } : outfit.hero;

  return (
    <View style={styles.stage}>
      <View style={styles.accent} />
      <Image source={imageSource} style={styles.image} resizeMode="cover" />

      {phase === 'loading' && (
        <View style={styles.loadingOverlay} accessibilityLabel="Generating your try-on">
          <ActivityIndicator size="large" color={palette.lime} />
          <Text style={styles.loadingText}>GENERATING YOUR TRY-ON…</Text>
        </View>
      )}

      <Tag label={outfit.occasion} style={styles.occasionTag} />
      {showingResult && <Tag label="✦ TRY-ON RESULT" tone="ink" style={styles.resultTag} />}

      <View style={styles.footer}>
        <Text style={styles.title}>{outfit.name.toUpperCase()}</Text>
        <Tag label={`✦ ${outfit.matchLabel}`} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stage: { height: HERO_HEIGHT, backgroundColor: palette.darkCard, overflow: 'hidden' },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, backgroundColor: palette.lime, zIndex: 3 },
  image: { width: '100%', height: '100%' },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(18,18,18,0.62)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: { color: palette.white, fontSize: 11, fontWeight: '700', letterSpacing: 1.6 },

  errorStage: { alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 28, gap: spacing.sm },
  errorTitle: { color: palette.danger, fontSize: 12, fontWeight: '800', letterSpacing: 1.8 },
  errorMessage: { color: palette.white, fontSize: 13, lineHeight: 19 },
  retryBtn: { alignSelf: 'flex-start', paddingHorizontal: 22, marginTop: spacing.xs },

  occasionTag: { position: 'absolute', top: 14, right: 14, zIndex: 3 },
  resultTag: { position: 'absolute', top: 14, left: 14, zIndex: 3 },

  footer: { position: 'absolute', left: spacing.screenX, right: spacing.screenX, bottom: spacing.lg, gap: spacing.xs, zIndex: 3 },
  title: {
    ...typography.heroTitle,
    color: palette.white,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 6,
  },
});

export default memo(TryOnStage);
