import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { palette, spacing } from '../theme';

interface ChipRowProps {
  items: string[];
  value: string;
  onChange: (item: string) => void;
}

/** Horizontal scrolling filter chips (Discover / Wardrobe). */
const ChipRow = ({ items, value, onChange }: ChipRowProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scroll}
    contentContainerStyle={styles.row}>
    {items.map(item => {
      const active = item === value;
      return (
        <Pressable
          key={item}
          onPress={() => onChange(item)}
          style={[styles.chip, active && styles.chipActive]}>
          <Text style={[styles.label, active && styles.labelActive]}>{item}</Text>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: { flexGrow: 0 },
  row: { paddingHorizontal: spacing.screenX, gap: 8, paddingVertical: 4 },
  chip: {
    paddingHorizontal: 16,
    height: 38,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: palette.ink,
    backgroundColor: palette.background,
  },
  chipActive: { backgroundColor: palette.ink },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: palette.ink },
  labelActive: { color: palette.white },
});

export default ChipRow;
