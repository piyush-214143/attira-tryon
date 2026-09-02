/**
 * Attira — AI stylist prototype.
 *
 * Recreates the Figma prototype flow (Splash → onboarding → tabbed app) with
 * React Navigation. The "TRY ON" action on OutfitDetailScreen is wired end to
 * end: it calls the backend, which calls Gemini for the styling note.
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProviders } from './src/app/providers/AppProviders';
import RootNavigator from './src/app/navigation/RootNavigator';

const App = () => (
  <AppProviders>
    <StatusBar barStyle="dark-content" />
    <RootNavigator />
  </AppProviders>
);

export default App;
