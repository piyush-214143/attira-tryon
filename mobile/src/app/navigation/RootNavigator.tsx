import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../../features/onboarding/screens/SplashScreen';
import WelcomeScreen from '../../features/onboarding/screens/WelcomeScreen';
import SignupScreen from '../../features/auth/screens/SignupScreen';
import LoginScreen from '../../features/auth/screens/LoginScreen';
import StyleQuizScreen from '../../features/onboarding/screens/StyleQuizScreen';
import RevealScreen from '../../features/onboarding/screens/RevealScreen';
import MainTabs from './MainTabs';
import { noHeader, stackHeader } from './headerOptions';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={noHeader}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ ...stackHeader, headerShown: true, title: 'CREATE ACCOUNT' }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ ...stackHeader, headerShown: true, title: 'CREATE ACCOUNT' }}
      />
      <Stack.Screen name="StyleQuiz" component={StyleQuizScreen} />
      <Stack.Screen name="Reveal" component={RevealScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
