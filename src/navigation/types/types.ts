

import {NavigatorScreenParams} from '@react-navigation/native';

export type WelcomeStackParamList = {
  SplashScreen: undefined;
  WelcomeScreen: undefined;
  OnboardingScreen: undefined;
  UserTypeSelectScreen: undefined;
};

export type AuthStackParamList = {
  SignupScreen: undefined;
  LoginScreen: undefined;
};

export type AppStackParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  WelcomeStack: NavigatorScreenParams<WelcomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
};


// export type RootStackParamList = {
//   SplashScreen: undefined;
//   OnboardingScreen: undefined;
//   UserTypeSelectScreen: undefined;
//   WelcomeScreen: undefined;
//   SignupScreen: undefined;
//   // Add other screen routes here
// };


//  ------ Temporary - to understand how its working

// import { useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../navigation/types';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootNav = StackNavigationProp<RootStackParamList>;

// const navigation = useNavigation<RootNav>();

// navigation.navigate('AuthStack'); // 👈 navigate to Auth stack
// If you're inside AuthStack and want to go to a screen in WelcomeStack, you can do:

// navigation.navigate('WelcomeStack', {
//   screen: 'WelcomeScreen', // 👈 nested screen
// });