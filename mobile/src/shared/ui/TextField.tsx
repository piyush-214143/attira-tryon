import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { palette, typography } from '../theme';

interface TextFieldProps extends TextInputProps {
  label: string;
}

/** Boxed input matching the Figma auth forms (white fill, hard black border). */
const TextField = ({ label, style, ...rest }: TextFieldProps) => (
  <View style={styles.wrap}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={palette.muted}
      style={[styles.input, style]}
      {...rest}
    />
  </View>
);

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  label: { ...typography.eyebrow, fontSize: 10, color: palette.mutedDark },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.white,
    paddingHorizontal: 16,
    fontSize: 16,
    color: palette.ink,
  },
});

export default TextField;
