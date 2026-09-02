import React, { useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { palette, spacing } from '../../../shared/theme';
import ShadowButton from '../../../shared/ui/ShadowButton';
import type { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    image: require('../../../assets/hero.jpg'),
    title: 'YOUR STYLE,\nELEVATED.',
    body: 'AI that learns you. Not trends. Your wardrobe, your rules, your era.',
  },
  {
    image: require('../../../assets/look-stark.jpg'),
    title: 'ONE TAP.\nA FULL LOOK.',
    body: 'AIRA reads the occasion and builds the outfit from what you already own.',
  },
  {
    image: require('../../../assets/look-weekend.jpg'),
    title: 'TRY IT ON\nBEFORE YOU WEAR IT.',
    body: 'See the fit and get a styling note in seconds — then step out sure.',
  },
];

const WelcomeScreen = ({ navigation }: Props) => {
  const scroller = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
  };

  const onNext = () => {
    if (index < SLIDES.length - 1) {
      scroller.current?.scrollTo({ x: width * (index + 1), animated: true });
    } else {
      navigation.navigate('Signup');
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView
        ref={scroller}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}>
        {SLIDES.map(slide => (
          <ImageBackground key={slide.title} source={slide.image} style={[styles.slide, { width }]}>
            <View style={styles.scrim} />
            <Text style={styles.count}>{`${SLIDES.indexOf(slide) + 1} / ${SLIDES.length}`}</Text>
            <View style={styles.accent} />
            <View style={styles.copy}>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.body}>{slide.body}</Text>
            </View>
          </ImageBackground>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((s, i) => (
            <View key={s.title} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <ShadowButton label="NEXT" trailing="→" onPress={onNext} />
        <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
          <Text style={styles.login}>
            Already have an account? <Text style={styles.loginStrong}>Log in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  slide: { flex: 1, justifyContent: 'flex-end' },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.28)' },
  count: {
    position: 'absolute',
    top: 16,
    right: spacing.screenX,
    color: palette.white,
    fontWeight: '700',
    letterSpacing: 1,
  },
  accent: { position: 'absolute', left: 0, top: '30%', bottom: '30%', width: 6, backgroundColor: palette.lime },
  copy: { padding: spacing.screenX, paddingBottom: 40 },
  title: { color: palette.white, fontSize: 34, fontWeight: '900', letterSpacing: -0.5, lineHeight: 36 },
  body: { color: 'rgba(255,255,255,0.85)', fontSize: 15, lineHeight: 21, marginTop: 12 },
  footer: { paddingHorizontal: spacing.screenX, paddingTop: 14, gap: 14, alignItems: 'stretch' },
  dots: { flexDirection: 'row', gap: 6, alignSelf: 'center' },
  dot: { width: 22, height: 6, backgroundColor: palette.divider },
  dotActive: { backgroundColor: palette.ink },
  login: { textAlign: 'center', color: palette.mutedDark, marginTop: 2 },
  loginStrong: { color: palette.ink, fontWeight: '700' },
});

export default WelcomeScreen;
