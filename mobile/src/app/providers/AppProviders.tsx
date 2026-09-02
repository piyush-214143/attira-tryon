import React, { type PropsWithChildren } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { palette } from '../../shared/theme';
import { persistor, store } from '../store';

const Loading = () => (
  <View style={styles.loading}>
    <ActivityIndicator color={palette.ink} />
  </View>
);

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.background },
});

export const AppProviders = ({ children }: PropsWithChildren) => (
  <ReduxProvider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </PersistGate>
  </ReduxProvider>
);
