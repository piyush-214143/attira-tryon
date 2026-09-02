import React, { useCallback, useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import AppButton from '../../../shared/ui/AppButton';
import { palette, spacing, typography } from '../../../shared/theme';
import OutfitItemRow from '../../outfit/components/OutfitItemRow';
import RelatedLookCard from '../../outfit/components/RelatedLookCard';
import { monochromePowerOutfit } from '../../outfit/data/monochromePowerOutfit';
import StylingNote from '../components/StylingNote';
import TryOnStage from '../components/TryOnStage';
import { useGenerateTryOn } from '../hooks/useGenerateTryOn';
import type { DiscoverStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<DiscoverStackParamList, 'OutfitDetail'>;

// Only one outfit is modelled in this prototype; params are wired for future ones.
const resolveOutfit = (_outfitId?: string) => monochromePowerOutfit;

const OutfitDetailScreen = ({ navigation, route }: Props) => {
  const outfit = resolveOutfit(route.params?.outfitId);
  const { phase, result, error, generate, reset } = useGenerateTryOn(outfit);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable hitSlop={10} accessibilityRole="button">
          {({ pressed }) => <Text style={[styles.save, pressed && styles.pressed]}>SAVE</Text>}
        </Pressable>
      ),
    });
  }, [navigation]);

  const primaryLabel = phase === 'success' ? 'TRY ON AGAIN' : 'TRY ON';

  const onPrimaryPress = useCallback(() => {
    if (phase === 'success') {
      reset();
    }
    generate();
  }, [phase, reset, generate]);

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* NOTE: the "TRY ON" CTA is the wired flow (→ backend → Gemini).
          SAVE / SHARE / RECREATE give press feedback only in this prototype. */}
      <TryOnStage outfit={outfit} phase={phase} result={result} error={error} onRetry={generate} />

      <StylingNote phase={phase} styleNote={result?.styleNote} fallbackReasoning={outfit.reasoning} />

      <Text style={styles.sectionLabel}>ITEMS IN THIS LOOK</Text>
      <View style={styles.itemList}>
        {outfit.items.map(item => (
          <OutfitItemRow key={item.id} item={item} />
        ))}
      </View>

      <AppButton label="RECREATE WITH MY CLOSET" variant="secondary" style={styles.recreateBtn} />

      <View style={styles.ctaRow}>
        <AppButton
          testID="generate-try-on"
          label={primaryLabel}
          trailing="→"
          loading={phase === 'loading'}
          onPress={onPrimaryPress}
          style={styles.primaryBtn}
        />
        <AppButton label="SHARE" variant="outline" style={styles.shareBtn} />
      </View>

      <Text style={[styles.sectionLabel, styles.relatedLabel]}>RELATED LOOKS</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.relatedRow}>
        {outfit.relatedLooks.map(look => (
          <RelatedLookCard key={look.id} look={look} />
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background },
  scroll: { paddingBottom: 32 },
  save: { fontSize: 11, fontWeight: '800', letterSpacing: 1.4, color: palette.limeDeep },
  pressed: { opacity: 0.4 },
  sectionLabel: {
    marginHorizontal: spacing.screenX,
    marginTop: spacing.xl,
    ...typography.eyebrow,
    fontWeight: '600',
    color: palette.muted,
  },
  relatedLabel: { marginBottom: spacing.xs },
  itemList: { marginHorizontal: spacing.screenX, marginTop: spacing.md, gap: 6 },
  recreateBtn: { marginHorizontal: spacing.screenX, marginTop: spacing.xl },
  ctaRow: { marginHorizontal: spacing.screenX, marginTop: 10, flexDirection: 'row', gap: 10 },
  primaryBtn: { flex: 1 },
  shareBtn: { width: 96 },
  relatedRow: { paddingHorizontal: spacing.screenX, gap: 8, paddingTop: 10 },
});

export default OutfitDetailScreen;
