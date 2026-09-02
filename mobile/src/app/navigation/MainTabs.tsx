import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { palette } from '../../shared/theme';
import DiscoverScreen from '../../features/discover/screens/DiscoverScreen';
import WardrobeScreen from '../../features/wardrobe/screens/WardrobeScreen';
import AiraScreen from '../../features/aira/screens/AiraScreen';
import StyleMeScreen from '../../features/aira/screens/StyleMeScreen';
import SavedScreen from '../../features/saved/screens/SavedScreen';
import ProfileScreen from '../../features/profile/screens/ProfileScreen';
import OutfitDetailScreen from '../../features/tryOn/screens/OutfitDetailScreen';
import { stackHeader } from './headerOptions';
import type { AiraStackParamList, DiscoverStackParamList, MainTabParamList } from './types';

const icons: Record<keyof MainTabParamList, ImageSourcePropType> = {
  DiscoverTab: require('../../assets/tab-discover.png'),
  WardrobeTab: require('../../assets/tab-wardrobe.png'),
  AiraTab: require('../../assets/tab-styleme.png'),
  SavedTab: require('../../assets/tab-saved.png'),
  ProfileTab: require('../../assets/tab-account.png'),
};

const DiscoverStackNav = createNativeStackNavigator<DiscoverStackParamList>();
const DiscoverStack = () => (
  <DiscoverStackNav.Navigator screenOptions={stackHeader}>
    <DiscoverStackNav.Screen name="DiscoverHome" component={DiscoverScreen} options={{ headerShown: false }} />
    <DiscoverStackNav.Screen name="OutfitDetail" component={OutfitDetailScreen} options={{ title: 'OUTFIT DETAIL' }} />
  </DiscoverStackNav.Navigator>
);

const AiraStackNav = createNativeStackNavigator<AiraStackParamList>();
const AiraStack = () => (
  <AiraStackNav.Navigator screenOptions={stackHeader}>
    <AiraStackNav.Screen name="AiraHome" component={AiraScreen} options={{ headerShown: false }} />
    <AiraStackNav.Screen name="StyleMe" component={StyleMeScreen} options={{ title: 'STYLE ME' }} />
    <AiraStackNav.Screen name="OutfitDetail" component={OutfitDetailScreen} options={{ title: 'OUTFIT DETAIL' }} />
  </AiraStackNav.Navigator>
);

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: palette.lime,
      tabBarInactiveTintColor: palette.mutedDark,
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ color }) => (
        <Image
          source={icons[route.name]}
          resizeMode="contain"
          style={[styles.icon, { tintColor: color }]}
        />
      ),
    })}>
    <Tab.Screen name="DiscoverTab" component={DiscoverStack} />
    <Tab.Screen name="WardrobeTab" component={WardrobeScreen} />
    <Tab.Screen name="AiraTab" component={AiraStack} />
    <Tab.Screen name="SavedTab" component={SavedScreen} />
    <Tab.Screen name="ProfileTab" component={ProfileScreen} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: palette.ink,
    borderTopWidth: 2,
    borderTopColor: palette.lime,
    height: 64,
  },
  icon: { width: 24, height: 24 },
});

export default MainTabs;
