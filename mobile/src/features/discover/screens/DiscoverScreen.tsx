import React, { useState } from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { palette, spacing } from '../../../shared/theme';
import ChipRow from '../../../shared/ui/ChipRow';
import Tag from '../../../shared/ui/Tag';
import { monochromePowerOutfit } from '../../outfit/data/monochromePowerOutfit';
import type { DiscoverStackParamList, MainTabParamList } from '../../../app/navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<DiscoverStackParamList, 'DiscoverHome'>,
  BottomTabScreenProps<MainTabParamList>
>;

const CATEGORIES = ['ALL', 'CASUAL', 'OFFICE', 'DATE NIGHT', 'WEEKEND'];

const DiscoverScreen = ({ navigation }: Props) => {
  const [mode, setMode] = useState<'SWIPE' | 'EXPLORE'>('SWIPE');
  const [category, setCategory] = useState('ALL');

  const openOutfit = () => navigation.navigate('OutfitDetail', { outfitId: monochromePowerOutfit.id });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>DISCOVER</Text>
        <View style={styles.toggle}>
          {(['SWIPE', 'EXPLORE'] as const).map(m => (
            <Pressable key={m} onPress={() => setMode(m)} style={[styles.toggleBtn, mode === m && styles.toggleActive]}>
              <Text style={[styles.toggleLabel, mode === m && styles.toggleLabelActive]}>{m}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ChipRow items={CATEGORIES} value={category} onChange={setCategory} />

      <View style={styles.stage}>
        <View style={styles.cardShadow} />
        <Pressable style={styles.card} onPress={openOutfit}>
          <ImageBackground source={monochromePowerOutfit.hero} style={styles.cardImage}>
            <View style={styles.accent} />
            <Tag label="✦ AIRA 97%" style={styles.badge} />
            <Tag label="OFFICE" tone="ink" style={styles.occasion} />
            <View style={styles.cardCaption}>
              <Text style={styles.lookName}>MONOCHROME{'\n'}POWER</Text>
              <Text style={styles.lookMeta}>4 items · AIRA curated</Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>

      <View style={styles.actions}>
        <Pressable style={[styles.action, styles.actionOutline]}>
          <Text style={styles.actionLabel}>✕  SKIP</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.actionOutline, styles.actionSquare]}>
          <Text style={styles.actionLabel}>↑</Text>
        </Pressable>
        <Pressable style={[styles.action, styles.actionLove]} onPress={openOutfit}>
          <Text style={styles.actionLoveLabel}>♥  LOVE</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  header: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 22, fontWeight: '900', letterSpacing: 0.5, color: palette.ink },
  toggle: { flexDirection: 'row', borderWidth: 1, borderColor: palette.ink },
  toggleBtn: { paddingHorizontal: 14, paddingVertical: 8 },
  toggleActive: { backgroundColor: palette.ink },
  toggleLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.2, color: palette.ink },
  toggleLabelActive: { color: palette.white },
  stage: { flex: 1, marginHorizontal: spacing.screenX, marginTop: spacing.sm },
  cardShadow: { position: 'absolute', left: 10, right: -6, top: 10, bottom: -6, backgroundColor: palette.divider },
  card: { flex: 1, borderWidth: 1, borderColor: palette.ink },
  cardImage: { flex: 1, justifyContent: 'flex-end' },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, backgroundColor: palette.lime },
  badge: { position: 'absolute', top: 14, left: 14 },
  occasion: { position: 'absolute', top: 14, right: 14 },
  cardCaption: { padding: spacing.lg },
  lookName: { color: palette.white, fontSize: 28, fontWeight: '900', lineHeight: 30 },
  lookMeta: { color: 'rgba(255,255,255,0.75)', marginTop: 8, letterSpacing: 0.5 },
  actions: { flexDirection: 'row', gap: 10, paddingHorizontal: spacing.screenX, paddingVertical: spacing.md },
  action: { height: 52, alignItems: 'center', justifyContent: 'center' },
  actionOutline: { flex: 1, borderWidth: 1, borderColor: palette.ink, backgroundColor: palette.background },
  actionSquare: { flex: 0, width: 60 },
  actionLove: { flex: 1.2, backgroundColor: palette.lime },
  actionLabel: { fontWeight: '800', letterSpacing: 1.4, color: palette.ink },
  actionLoveLabel: { fontWeight: '800', letterSpacing: 1.4, color: palette.ink },
});

export default DiscoverScreen;
