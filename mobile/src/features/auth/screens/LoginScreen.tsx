import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommonActions } from '@react-navigation/native';
import { palette, spacing } from '../../../shared/theme';
import ShadowButton from '../../../shared/ui/ShadowButton';
import TextField from '../../../shared/ui/TextField';
import SocialButtons from '../components/SocialButtons';
import type { RootStackParamList } from '../../../app/navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const set = (k: keyof typeof form) => (v: string) => setForm(s => ({ ...s, [k]: v }));

  const enter = () =>
    navigation.dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Main' }] }),
    );

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <TextField
          label="EMAIL ADDRESS"
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={set('email')}
        />
        <TextField
          label="PASSWORD"
          placeholder="••••••••"
          secureTextEntry
          value={form.password}
          onChangeText={set('password')}
        />

        <SocialButtons />

        <Pressable onPress={() => navigation.navigate('Signup')} hitSlop={8} style={styles.linkRow}>
          <Text style={styles.link}>
            Do not have an account? <Text style={styles.linkStrong}>Sign up</Text>
          </Text>
        </Pressable>

        <ShadowButton label="CONTINUE" trailing="→" onPress={enter} style={styles.cta} />
        <Text style={styles.terms}>
          By continuing you agree to Attira's Terms of Service and Privacy Policy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.background },
  scroll: { padding: spacing.screenX, paddingTop: spacing.xxl, gap: 18 },
  linkRow: { alignItems: 'center' },
  link: { color: palette.mutedDark },
  linkStrong: { color: palette.ink, fontWeight: '700' },
  cta: { marginTop: 4 },
  terms: { color: palette.muted, fontSize: 12, textAlign: 'center', marginTop: 8 },
});

export default LoginScreen;
