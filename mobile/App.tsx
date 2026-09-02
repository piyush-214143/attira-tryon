/**
 * Attira — Virtual Try-On prototype
 * Recreates the Figma "OutfitDetailScreen" and wires the "Generate Try-On"
 * action to the backend (which calls Gemini for the styling note).
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProviders } from './src/app/providers/AppProviders';
import { monochromePowerOutfit } from './src/features/outfit';
import { OutfitDetailScreen } from './src/features/tryOn';

const App = () => (
  <AppProviders>
    <StatusBar barStyle="dark-content" />
    <OutfitDetailScreen outfit={monochromePowerOutfit} />
  </AppProviders>
);

export default App;
