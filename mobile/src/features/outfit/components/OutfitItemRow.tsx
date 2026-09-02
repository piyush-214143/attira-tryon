import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../../shared/theme';
import type { OutfitItem } from '../model/types';

const OutfitItemRow = ({ item }: { item: OutfitItem }) => (
  <View style={styles.row}>
    <View style={styles.thumbWrap}>
      <Image source={item.image} style={styles.thumb} resizeMode="cover" />
    </View>
    <View style={styles.text}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.meta}>{item.meta}</Text>
    </View>
    <Text style={styles.check}>✓</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.white,
    paddingVertical: 11,
    paddingHorizontal: 13,
    gap: 12,
  },
  thumbWrap: { width: 40, height: 40, backgroundColor: palette.ink },
  thumb: { width: '100%', height: '100%' },
  text: { flex: 1, gap: 2 },
  name: { fontSize: 11, fontWeight: '500', color: palette.ink },
  meta: { fontSize: 9, color: palette.muted },
  check: { fontSize: 12, fontWeight: '700', color: palette.limeDeep },
});

export default memo(OutfitItemRow);
