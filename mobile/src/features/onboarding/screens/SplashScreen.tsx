import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { palette } from '../../../shared/theme';
import Spark from '../../../shared/ui/Spark';
import type { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen = ({ navigation }: Props) => {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Welcome'), 1800);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.root}>
      <Spark size={54} color={palette.lime} />
      <Text style={styles.wordmark}>ATTIRA</Text>
      <Text style={styles.tagline}>AI-POWERED PERSONAL STYLIST</Text>
      <View style={styles.dots}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.ink, alignItems: 'center', justifyContent: 'center' },
  wordmark: {
    marginTop: 18,
    color: palette.lime,
    fontSize: 52,
    fontWeight: '900',
    letterSpacing: 2,
  },
  tagline: {
    marginTop: 14,
    color: palette.muted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 3,
  },
  dots: { flexDirection: 'row', gap: 8, marginTop: 44 },
  dot: { width: 8, height: 8, backgroundColor: palette.mutedDark },
  dotActive: { backgroundColor: palette.lime },
});

export default SplashScreen;
