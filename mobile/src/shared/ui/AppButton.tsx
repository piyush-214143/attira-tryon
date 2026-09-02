import React, { memo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { palette, typography } from '../theme';

export type AppButtonVariant = 'primary' | 'secondary' | 'outline';

interface AppButtonProps {
  label: string;
  onPress?: () => void;
  variant?: AppButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  /** Optional trailing glyph, e.g. an arrow. Hidden while loading. */
  trailing?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const AppButton = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  trailing,
  style,
  testID,
}: AppButtonProps) => {
  const isDisabled = disabled || loading;
  const spinnerColor = variant === 'secondary' ? palette.ink : palette.lime;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        VARIANT_STYLE[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}>
      <View style={styles.content}>
        {loading && <ActivityIndicator size="small" color={spinnerColor} />}
        <Text style={[styles.label, LABEL_STYLE[variant]]}>
          {loading ? 'GENERATING…' : label}
          {!loading && trailing ? `  ${trailing}` : ''}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { height: 46, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { ...typography.button },
  pressed: { opacity: 0.7 },
  disabled: { opacity: 0.6 },
});

const VARIANT_STYLE: Record<AppButtonVariant, ViewStyle> = {
  primary: { backgroundColor: palette.ink },
  secondary: { backgroundColor: palette.lime },
  outline: { borderWidth: 1, borderColor: palette.ink, backgroundColor: 'transparent' },
};

const LABEL_STYLE = {
  primary: { color: palette.lime },
  secondary: { color: palette.ink, letterSpacing: 2.3, fontSize: 10.5 },
  outline: { color: palette.ink },
} as const;

export default memo(AppButton);
