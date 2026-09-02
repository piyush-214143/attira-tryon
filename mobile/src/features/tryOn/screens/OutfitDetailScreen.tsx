import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../../../shared/ui/AppButton';
import { palette, spacing, typography } from '../../../shared/theme';
import OutfitItemRow from '../../outfit/components/OutfitItemRow';
import RelatedLookCard from '../../outfit/components/RelatedLookCard';
import type { Outfit } from '../../outfit/model/types';
import StylingNote from '../components/StylingNote';
import TryOnStage from '../components/TryOnStage';
import { useGenerateTryOn } from '../hooks/useGenerateTryOn';

interface OutfitDetailScreenProps {
  outfit: Outfit;
}

const NavBar = () => (
  <View style={styles.nav}>
    <Text style={styles.navBack}>←</Text>
    <Text style={styles.navTitle}>OUTFIT DETAIL</Text>
    <Text style={styles.navSave}>SAVE</Text>
  </View>
);

const BottomBar = () => (
  <View style={styles.tabBar}>
    {['▦', '▤', '✦', '♡', '○'].map((glyph, index) => (
      <Text key={glyph} style={[styles.tabIcon, index === 2 && styles.tabIconActive]}>
        {glyph}
      </Text>
    ))}
  </View>
);

export const OutfitDetailScreen = ({ outfit }: OutfitDetailScreenProps) => {
  const { phase, result, error, generate, reset } = useGenerateTryOn(outfit);

  const primaryLabel =
    phase === 'success' ? 'TRY ON AGAIN' : phase === 'error' ? 'GENERATE TRY-ON' : 'GENERATE TRY-ON';

  const onPrimaryPress = useCallback(() => {
    if (phase === 'success') {
      reset();
    }
    generate();
  }, [phase, reset, generate]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <NavBar />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TryOnStage
          outfit={outfit}
          phase={phase}
          result={result}
          error={error}
          onRetry={generate}
        />

        <StylingNote
          phase={phase}
          styleNote={result?.styleNote}
          fallbackReasoning={outfit.reasoning}
        />

        <Text style={styles.sectionLabel}>ITEMS IN THIS LOOK</Text>
        <View style={styles.itemList}>
          {outfit.items.map(item => (
            <OutfitItemRow key={item.id} item={item} />
          ))}
        </View>

        <AppButton
          label="RECREATE WITH MY CLOSET"
          variant="secondary"
          style={styles.recreateBtn}
        />

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

      <BottomBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { paddingBottom: 24 },

  nav: {
    height: 52,
    paddingHorizontal: spacing.screenX,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.divider,
  },
  navBack: { fontSize: 18, fontWeight: '700', color: palette.ink, width: 40 },
  navTitle: { ...typography.navTitle, color: palette.ink },
  navSave: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: palette.limeDeep,
    width: 40,
    textAlign: 'right',
  },

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

  tabBar: {
    height: 56,
    backgroundColor: palette.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabIcon: { color: palette.muted, fontSize: 18 },
  tabIconActive: { color: palette.lime },
});

export default OutfitDetailScreen;
