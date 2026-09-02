import React from 'react';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { palette, spacing } from '../../../shared/theme';
import Spark from '../../../shared/ui/Spark';
import Tag from '../../../shared/ui/Tag';
import { monochromePowerOutfit } from '../../outfit/data/monochromePowerOutfit';
import type { AiraStackParamList, MainTabParamList } from '../../../app/navigation/types';

type Props = CompositeScreenProps<
  NativeStackScreenProps<AiraStackParamList, 'AiraHome'>,
  BottomTabScreenProps<MainTabParamList>
>;

const QUICK_ACTIONS = [
  { key: 'style-me', title: 'STYLE ME', sub: 'Build me an outfit' },
  { key: 'plan', title: 'PLAN MY WEEK', sub: '7-day outfit plan' },
  { key: 'try-on', title: 'TRY SOMETHING ON', sub: 'Virtual try-on' },
  { key: 'chat', title: 'AIRA CHAT', sub: 'Ask me anything' },
];

const AiraScreen = ({ navigation }: Props) => {
  const onQuickAction = (key: string) => {
    if (key === 'style-me') navigation.navigate('StyleMe');
    else if (key === 'try-on') navigation.navigate('OutfitDetail', { outfitId: monochromePowerOutfit.id });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.eyebrowRow}>
          <Spark size={14} />
          <Text style={styles.eyebrow}>AIRA · ACTIVE</Text>
        </View>
        <Text style={styles.title}>GOOD MORNING,{'\n'}MAYA.</Text>

        <View style={styles.contextRow}>
          <View style={styles.contextChip}><Text style={styles.contextText}>☁  14° Cloudy</Text></View>
          <View style={styles.contextChip}><Text style={styles.contextText}>🗓  Team meeting 10am</Text></View>
        </View>

        <Text style={styles.section}>TODAY'S LOOK</Text>
        <View style={styles.frame}>
          <ImageBackground source={monochromePowerOutfit.hero} style={styles.lookImage}>
            <Tag label="✦ AIRA 97%" style={styles.badge} />
            <View style={styles.lookCaption}>
              <Text style={styles.lookName}>MONOCHROME POWER</Text>
              <Text style={styles.lookMeta}>4 items · Office ready</Text>
            </View>
          </ImageBackground>
          <View style={styles.lookActions}>
            <Pressable style={[styles.lookBtn, styles.lookBtnPrimary]}>
              <Text style={styles.lookBtnPrimaryLabel}>WEAR THIS</Text>
            </Pressable>
            <Pressable style={[styles.lookBtn, styles.lookBtnGhost]}>
              <Text style={styles.lookBtnGhostLabel}>NOT TODAY</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.section}>QUICK ACTIONS</Text>
        <View style={styles.grid}>
          {QUICK_ACTIONS.map(a => (
            <Pressable key={a.key} style={styles.actionCard} onPress={() => onQuickAction(a.key)}>
              <Spark size={12} />
              <Text style={styles.actionTitle}>{a.title}</Text>
              <Text style={styles.actionSub}>{a.sub}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.accuracyCard}>
          <View style={styles.ring}><Text style={styles.ringText}>84%</Text></View>
          <View style={styles.accuracyCopy}>
            <Text style={styles.accuracyTitle}>AIRA KNOWS YOUR STYLE</Text>
            <Text style={styles.accuracySub}>Keep swiping in Discover to improve accuracy.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.ink },
  scroll: { padding: spacing.screenX, paddingBottom: 32 },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyebrow: { color: palette.lime, fontWeight: '800', letterSpacing: 2, fontSize: 12 },
  title: { color: palette.white, fontSize: 30, fontWeight: '900', letterSpacing: -0.5, lineHeight: 34, marginTop: 10 },
  contextRow: { flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap' },
  contextChip: { borderWidth: 1, borderColor: palette.mutedDark, paddingHorizontal: 12, paddingVertical: 8 },
  contextText: { color: palette.white, fontSize: 12 },
  section: { color: palette.muted, letterSpacing: 2, fontSize: 10, fontWeight: '700', marginTop: spacing.xxl, marginBottom: spacing.md },
  frame: { borderWidth: 3, borderColor: palette.lime },
  lookImage: { height: 260, justifyContent: 'flex-end' },
  badge: { position: 'absolute', top: 12, right: 12 },
  lookCaption: { padding: spacing.md },
  lookName: { color: palette.white, fontSize: 20, fontWeight: '900' },
  lookMeta: { color: 'rgba(255,255,255,0.7)', marginTop: 4, fontSize: 12 },
  lookActions: { flexDirection: 'row' },
  lookBtn: { flex: 1, height: 48, alignItems: 'center', justifyContent: 'center' },
  lookBtnPrimary: { backgroundColor: palette.lime },
  lookBtnPrimaryLabel: { color: palette.ink, fontWeight: '800', letterSpacing: 1.4 },
  lookBtnGhost: { borderWidth: 1, borderColor: palette.mutedDark },
  lookBtnGhostLabel: { color: palette.white, fontWeight: '800', letterSpacing: 1.4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: {
    width: '47%',
    flexGrow: 1,
    borderWidth: 1,
    borderColor: palette.mutedDark,
    padding: spacing.md,
    gap: 6,
    minHeight: 96,
  },
  actionTitle: { color: palette.white, fontWeight: '800', letterSpacing: 0.5 },
  actionSub: { color: palette.muted, fontSize: 12 },
  accuracyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: palette.mutedDark,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  ring: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: palette.lime,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: { color: palette.lime, fontWeight: '800', fontSize: 13 },
  accuracyCopy: { flex: 1 },
  accuracyTitle: { color: palette.white, fontWeight: '800', letterSpacing: 0.5 },
  accuracySub: { color: palette.muted, fontSize: 12, marginTop: 4 },
});

export default AiraScreen;
