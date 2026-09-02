import React, { memo } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { palette, typography } from '../theme';

type Variant = 'lime' | 'ink' | 'outline';

interface ShadowButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  trailing?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * The Figma's signature CTA: a solid block sitting on a hard offset shadow.
 * Used for NEXT / CONTINUE / ENTER ATTIRA / TRY ON.
 */
const ShadowButton = ({
  label,
  onPress,
  variant = 'lime',
  trailing,
  loading = false,
  disabled = false,
  style,
  testID,
}: ShadowButtonProps) => {
  const isDisabled = disabled || loading;
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.shadow} />
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        disabled={isDisabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.face,
          FACE[variant],
          pressed && !isDisabled && styles.pressed,
          isDisabled && styles.disabled,
        ]}>
        {loading ? (
          <ActivityIndicator color={variant === 'lime' ? palette.ink : palette.lime} />
        ) : (
          <Text style={[styles.label, LABEL[variant]]}>
            {label}
            {trailing ? `  ${trailing}` : ''}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: { position: 'relative' },
  shadow: {
    position: 'absolute',
    left: 6,
    right: -6,
    top: 6,
    bottom: -6,
    backgroundColor: palette.ink,
  },
  face: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: palette.ink,
  },
  pressed: { transform: [{ translateX: 3 }, { translateY: 3 }] },
  disabled: { opacity: 0.55 },
  label: { ...typography.button },
});

const FACE: Record<Variant, ViewStyle> = {
  lime: { backgroundColor: palette.lime },
  ink: { backgroundColor: palette.ink },
  outline: { backgroundColor: palette.background },
};

const LABEL = {
  lime: { color: palette.ink },
  ink: { color: palette.lime },
  outline: { color: palette.ink },
} as const;

export default memo(ShadowButton);
