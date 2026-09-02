import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  StyleQuiz: undefined;
  Reveal: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};

export type MainTabParamList = {
  DiscoverTab: NavigatorScreenParams<DiscoverStackParamList> | undefined;
  WardrobeTab: undefined;
  AiraTab: NavigatorScreenParams<AiraStackParamList> | undefined;
  SavedTab: undefined;
  ProfileTab: undefined;
};

export type DiscoverStackParamList = {
  DiscoverHome: undefined;
  OutfitDetail: { outfitId?: string } | undefined;
};

export type AiraStackParamList = {
  AiraHome: undefined;
  StyleMe: undefined;
  OutfitDetail: { outfitId?: string } | undefined;
};
