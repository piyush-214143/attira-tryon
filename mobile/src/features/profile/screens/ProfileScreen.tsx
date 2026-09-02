import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, spacing } from '../../../shared/theme';
import Spark from '../../../shared/ui/Spark';

// No dedicated Figma frame for Profile — kept minimal and on-brand.
const STYLE_DNA = ['MONOCHROME', 'TAILORED', 'OFFICE', 'STRUCTURED'];
const ROWS = ['Retake style quiz', 'Notifications', 'Connected accounts', 'About Attira', 'Log out'];

const ProfileScreen = () => (
  <SafeAreaView style={styles.safe} edges={['top']}>
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>PROFILE</Text>

      <View style={styles.card}>
        <View style={styles.avatar}><Text style={styles.avatarText}>M</Text></View>
        <View style={styles.identity}>
          <Text style={styles.name}>Maya Ellison</Text>
          <Text style={styles.handle}>maya@attira.app</Text>
        </View>
      </View>

      <View style={styles.dnaHeader}>
        <Spark size={12} color={palette.ink} />
        <Text style={styles.dnaTitle}>YOUR STYLE DNA</Text>
      </View>
      <View style={styles.dnaRow}>
        {STYLE_DNA.map(tag => (
          <View key={tag} style={styles.dnaChip}><Text style={styles.dnaChipText}>{tag}</Text></View>
        ))}
      </View>

      <View style={styles.list}>
        {ROWS.map(row => (
          <Pressable key={row} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <Text style={styles.rowLabel}>{row}</Text>
            <Text style={styles.rowChevron}>→</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { padding: spacing.screenX, paddingBottom: 32 },
  title: { fontSize: 20, fontWeight: '900', letterSpacing: 1, color: palette.ink },
  card: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: palette.ink,
    padding: spacing.lg,
  },
  avatar: { width: 56, height: 56, backgroundColor: palette.lime, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '900', color: palette.ink },
  identity: { flex: 1 },
  name: { color: palette.white, fontSize: 18, fontWeight: '800' },
  handle: { color: palette.muted, marginTop: 2 },
  dnaHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: spacing.xxl },
  dnaTitle: { letterSpacing: 2, fontSize: 10, fontWeight: '700', color: palette.mutedDark },
  dnaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: spacing.md },
  dnaChip: { borderWidth: 1, borderColor: palette.ink, paddingHorizontal: 12, paddingVertical: 6 },
  dnaChipText: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: palette.ink },
  list: { marginTop: spacing.xxl, borderTopWidth: 1, borderTopColor: palette.divider },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: palette.divider,
  },
  rowPressed: { opacity: 0.5 },
  rowLabel: { fontSize: 15, color: palette.ink },
  rowChevron: { fontSize: 15, color: palette.muted },
});

export default ProfileScreen;
