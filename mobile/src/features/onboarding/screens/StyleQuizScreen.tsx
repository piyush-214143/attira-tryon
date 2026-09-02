import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { palette, spacing } from '../../../shared/theme';
import ShadowButton from '../../../shared/ui/ShadowButton';
import { quizQuestions } from '../data/quizQuestions';
import type { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'StyleQuiz'>;

const TOTAL = quizQuestions.length;

const StyleQuizScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const question = quizQuestions[step];
  const selected = answers[step];

  const choose = (option: string) => setAnswers(a => ({ ...a, [step]: option }));

  const onContinue = () => {
    if (step < TOTAL - 1) {
      setStep(s => s + 1);
    } else {
      navigation.replace('Reveal');
    }
  };

  const onBack = () => (step === 0 ? navigation.goBack() : setStep(s => s - 1));

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Pressable onPress={onBack} hitSlop={12}>
            <Text style={styles.eyebrow}>{question.eyebrow}</Text>
          </Pressable>
          <Text style={styles.count}>{`${step + 1} OF ${TOTAL}`}</Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${((step + 1) / TOTAL) * 100}%` }]} />
        </View>
      </View>

      <Text style={styles.prompt}>{question.prompt}</Text>

      <View style={styles.grid}>
        {[0, 1].map(rowIndex => (
          <View key={rowIndex} style={styles.gridRow}>
            {question.options.slice(rowIndex * 2, rowIndex * 2 + 2).map(option => {
              const active = option === selected;
              return (
                <Pressable
                  key={option}
                  onPress={() => choose(option)}
                  style={({ pressed }) => [
                    styles.tile,
                    active && styles.tileActive,
                    pressed && styles.tilePressed,
                  ]}>
                  <Text style={[styles.tileLabel, active && styles.tileLabelActive]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <ShadowButton
        label="CONTINUE"
        trailing="→"
        variant="outline"
        disabled={!selected}
        onPress={onContinue}
        style={styles.cta}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background, paddingHorizontal: spacing.screenX },
  header: { paddingTop: spacing.md, gap: 10 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eyebrow: { fontSize: 15, fontWeight: '800', letterSpacing: 1, color: palette.ink },
  count: { color: palette.mutedDark, fontWeight: '600', letterSpacing: 1 },
  track: { height: 3, backgroundColor: palette.divider },
  fill: { height: 3, backgroundColor: palette.ink },
  prompt: { marginTop: spacing.xl, fontSize: 34, fontWeight: '900', letterSpacing: -0.5, lineHeight: 36, color: palette.ink },
  grid: { flex: 1, marginTop: spacing.lg, gap: 12 },
  gridRow: { flex: 1, flexDirection: 'row', gap: 12 },
  tile: {
    flex: 1,
    backgroundColor: palette.mutedDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileActive: { backgroundColor: palette.ink },
  tilePressed: { opacity: 0.85 },
  tileLabel: { color: palette.lime, fontSize: 16, fontWeight: '800', letterSpacing: 1.5 },
  tileLabelActive: { color: palette.lime },
  cta: { marginVertical: spacing.lg },
});

export default StyleQuizScreen;
