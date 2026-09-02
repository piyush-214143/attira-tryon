import React, { memo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../../shared/theme';
import type { RelatedLook } from '../model/types';

const RelatedLookCard = ({ look }: { look: RelatedLook }) => (
  <View style={styles.card}>
    <Image source={look.image} style={styles.image} resizeMode="cover" />
    <View style={[styles.accent, { backgroundColor: look.accent }]} />
    <Text style={styles.text} numberOfLines={2}>
      {look.name}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: { width: 110, height: 145, backgroundColor: palette.darkCard, overflow: 'hidden' },
  image: { position: 'absolute', top: 0, left: 0, width: 110, height: 145 },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 3 },
  text: { position: 'absolute', left: 8, right: 8, bottom: 10, color: palette.white, fontSize: 9, fontWeight: '700' },
});

export default memo(RelatedLookCard);
