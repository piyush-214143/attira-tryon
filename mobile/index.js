/**
 * @format
 */

import { LogBox } from 'react-native';

// react-native-screens 4.x reaches for a private RN feature-flags path on 0.87;
// the fallback resolution works — silence the noise before anything imports it.
LogBox.ignoreLogs([/ReactNativeFeatureFlags/]);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { AppRegistry } = require('react-native');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const App = require('./App').default;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name: appName } = require('./app.json');

AppRegistry.registerComponent(appName, () => App);
