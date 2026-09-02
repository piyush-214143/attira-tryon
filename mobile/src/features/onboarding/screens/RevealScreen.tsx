import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { palette, spacing } from '../../../shared/theme';
import ShadowButton from '../../../shared/ui/ShadowButton';
import Spark from '../../../shared/ui/Spark';
import Tag from '../../../shared/ui/Tag';
import type { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Reveal'>;

const RevealScreen = ({ navigation }: Props) => {
  const enter = () =>
    navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.head}>
        <View style={styles.eyebrowRow}>
          <Spark size={14} />
          <Text style={styles.eyebrow}>FIRST LOOK READY</Text>
        </View>
        <Text style={styles.title}>AIRA HAS{'\n'}STYLED YOU.</Text>
      </View>

      <View style={styles.frame}>
        <ImageBackground source={require('../../../assets/hero.jpg')} style={styles.image}>
          <Tag label="OFFICE" tone="ink" style={styles.tag} />
          <View style={styles.caption}>
            <Text style={styles.lookName}>MONOCHROME{'\n'}POWER</Text>
            <View style={styles.metaRow}>
              <Tag label="✦ AIRA 97%" />
              <Text style={styles.meta}>4 items · Office</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <ShadowButton label="ENTER ATTIRA" trailing="→" onPress={enter} style={styles.cta} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.ink, paddingHorizontal: spacing.screenX },
  head: { paddingTop: spacing.md },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  eyebrow: { color: palette.lime, fontWeight: '800', letterSpacing: 3, fontSize: 12 },
  title: { color: palette.lime, fontSize: 40, fontWeight: '900', letterSpacing: -0.5, lineHeight: 42, marginTop: 12 },
  frame: { flex: 1, marginVertical: spacing.lg, borderWidth: 6, borderColor: palette.lime },
  image: { flex: 1, justifyContent: 'flex-end' },
  tag: { position: 'absolute', top: 12, right: 12 },
  caption: { padding: spacing.lg },
  lookName: { color: palette.white, fontSize: 26, fontWeight: '900', lineHeight: 28 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  meta: { color: 'rgba(255,255,255,0.75)' },
  cta: { marginBottom: spacing.lg },
});

export default RevealScreen;
