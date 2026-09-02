import React, { memo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { palette } from '../theme';

interface TagProps {
  label: string;
  tone?: 'lime' | 'ink';
  style?: StyleProp<ViewStyle>;
}

const Tag = ({ label, tone = 'lime', style }: TagProps) => (
  <View style={[styles.tag, tone === 'lime' ? styles.lime : styles.ink, style]}>
    <Text style={[styles.text, tone === 'lime' ? styles.textOnLime : styles.textOnInk]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  tag: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3 },
  lime: { backgroundColor: palette.lime },
  ink: { backgroundColor: palette.ink },
  text: { fontSize: 7.5, fontWeight: '700', letterSpacing: 1 },
  textOnLime: { color: palette.ink },
  textOnInk: { color: palette.lime },
});

export default memo(Tag);
