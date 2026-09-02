import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../../shared/theme';

/** "OR / Continue with Google / Apple" block shared by Login + Signup. */
const SocialButtons = () => (
  <View style={styles.wrap}>
    <View style={styles.orRow}>
      <View style={styles.rule} />
      <Text style={styles.or}>OR</Text>
      <View style={styles.rule} />
    </View>
    {[
      { key: 'google', label: 'Continue with Google', glyph: 'G' },
      { key: 'apple', label: 'Continue with Apple', glyph: '' },
    ].map(p => (
      <Pressable key={p.key} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
        <Text style={styles.glyph}>{p.glyph}</Text>
        <Text style={styles.label}>{p.label}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 4 },
  rule: { flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: palette.muted },
  or: { color: palette.mutedDark, fontWeight: '700', letterSpacing: 2, fontSize: 12 },
  btn: {
    height: 52,
    backgroundColor: palette.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  pressed: { opacity: 0.8 },
  glyph: { color: palette.white, fontSize: 16, fontWeight: '800' },
  label: { color: palette.white, fontSize: 15, fontWeight: '700' },
});

export default SocialButtons;
