import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { palette, typography } from '../../shared/theme';

/**
 * Shared native-stack header styling to match the Figma's centred, heavy,
 * uppercase screen titles. Individual screens still set `title`.
 */
export const stackHeader: NativeStackNavigationOptions = {
  headerTitleAlign: 'center',
  headerShadowVisible: false,
  headerTintColor: palette.ink,
  headerStyle: { backgroundColor: palette.background },
  headerTitleStyle: {
    ...typography.navTitle,
    fontSize: 15,
    color: palette.ink,
  },
  headerBackButtonDisplayMode: 'minimal',
  contentStyle: { backgroundColor: palette.background },
};

export const noHeader: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: palette.background },
};
