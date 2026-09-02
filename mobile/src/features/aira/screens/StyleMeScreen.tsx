import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { palette, spacing } from '../../../shared/theme';

const OCCASIONS = ['CASUAL', 'OFFICE', 'DATE NIGHT', 'WEEKEND', 'ATHLEISURE', 'SOCIAL', 'TRAVEL', 'GYM'];

const StyleMeScreen = () => {
  const [occasion, setOccasion] = useState<string>();

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.scroll}>
      <Text style={styles.title}>WHAT'S THE{'\n'}OCCASION?</Text>
      <Text style={styles.sub}>AIRA will search your wardrobe and build the perfect look.</Text>

      <View style={styles.grid}>
        {OCCASIONS.map(o => {
          const active = o === occasion;
          return (
            <Pressable
              key={o}
              onPress={() => setOccasion(o)}
              style={[styles.tile, active && styles.tileActive]}>
              <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>{o}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.fieldLabel}>WHEN? (OPTIONAL)</Text>
      <View style={styles.field}>
        <Text style={styles.fieldValue}>Today, Friday</Text>
        <Text style={styles.fieldChevron}>▾</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.background },
  scroll: { padding: spacing.screenX, paddingTop: spacing.xl },
  title: { fontSize: 32, fontWeight: '900', letterSpacing: -0.5, lineHeight: 34, color: palette.ink },
  sub: { color: palette.mutedDark, marginTop: 12, fontSize: 14, lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: spacing.xl },
  tile: {
    width: '47%',
    flexGrow: 1,
    minHeight: 64,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
  },
  tileActive: { borderColor: palette.ink, backgroundColor: palette.ink },
  tileLabel: { fontWeight: '800', letterSpacing: 0.5, color: palette.ink },
  tileLabelActive: { color: palette.lime },
  fieldLabel: { marginTop: spacing.xxl, color: palette.muted, letterSpacing: 2, fontSize: 10, fontWeight: '700' },
  field: {
    marginTop: 10,
    height: 52,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fieldValue: { color: palette.mutedDark, fontSize: 15 },
  fieldChevron: { color: palette.mutedDark },
});

export default StyleMeScreen;
