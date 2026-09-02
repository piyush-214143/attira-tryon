import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette, spacing } from '../../../shared/theme';
import ChipRow from '../../../shared/ui/ChipRow';
import { wardrobeCategories, wardrobeItems } from '../data/wardrobeItems';

const WardrobeScreen = () => {
  const [category, setCategory] = useState('ALL');

  const items = useMemo(
    () =>
      category === 'ALL'
        ? wardrobeItems
        : wardrobeItems.filter(i => i.category.toUpperCase() === category),
    [category],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>MY WARDROBE</Text>
        <Pressable style={styles.addBtn}>
          <Text style={styles.addLabel}>+ ADD</Text>
        </Pressable>
      </View>

      <View style={styles.readiness}>
        <View style={styles.readinessRow}>
          <Text style={styles.readinessText}>74% ready for summer</Text>
          <Text style={styles.readinessPct}>74%</Text>
        </View>
        <View style={styles.track}>
          <View style={styles.fill} />
        </View>
      </View>

      <ChipRow items={wardrobeCategories} value={category} onChange={setCategory} />

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {items.map(item => (
          <View key={item.id} style={styles.cell}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>{item.category}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        ))}
        <Pressable style={[styles.cell, styles.addCell]}>
          <Text style={styles.addPlus}>+</Text>
          <Text style={styles.addCellLabel}>ADD ITEM</Text>
        </Pressable>
      </ScrollView>
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
  title: { fontSize: 20, fontWeight: '900', letterSpacing: 0.5, color: palette.ink },
  addBtn: { backgroundColor: palette.lime, paddingHorizontal: 16, paddingVertical: 10 },
  addLabel: { fontWeight: '800', letterSpacing: 1, color: palette.ink },
  readiness: { margin: spacing.screenX, marginBottom: spacing.sm, backgroundColor: palette.ink, padding: spacing.md, gap: 10 },
  readinessRow: { flexDirection: 'row', justifyContent: 'space-between' },
  readinessText: { color: palette.white, fontWeight: '600' },
  readinessPct: { color: palette.lime, fontWeight: '800' },
  track: { height: 6, backgroundColor: palette.mutedDark },
  fill: { height: 6, width: '74%', backgroundColor: palette.lime },
  grid: {
    paddingHorizontal: spacing.screenX,
    paddingTop: spacing.md,
    paddingBottom: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    rowGap: 18,
  },
  cell: { width: '31%' },
  image: { width: '100%', height: 108, backgroundColor: palette.divider },
  name: { marginTop: 6, fontWeight: '700', fontSize: 12, color: palette.ink },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  meta: { fontSize: 10, color: palette.muted },
  price: { fontSize: 10, color: palette.muted },
  addCell: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: palette.muted,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlus: { fontSize: 22, color: palette.muted },
  addCellLabel: { fontSize: 10, letterSpacing: 1, color: palette.muted, marginTop: 4 },
});

export default WardrobeScreen;
