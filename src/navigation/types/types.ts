import {NavigatorScreenParams} from '@react-navigation/native';

export type WelcomeStackParamList = {
  SplashScreen: undefined;
  WelcomeScreen: undefined;
  OnboardingScreen: undefined;
  UserTypeSelectScreen: undefined;
  SPWelcomeScreen: undefined;
};

export type AuthStackParamList = {
  SignupScreen: undefined;
  LoginScreen: {fromScreen?: string} | undefined;
  SPSignupScreen: undefined;
  ForgotPassword: undefined;
  SetPassword: undefined;
  SPLoginScreen: undefined;
};

// not created yet
export type AppDrawerParamList = {
  // HomeScreen: undefined;
  // ProfileScreen: undefined;
};

// not created yet
export type AppStackParamList = {
  // HomeScreen: undefined;
  // ProfileScreen: undefined;
  SuccessScreen: {successMsg?: string} | undefined;
};

// not created yet - tow truck as service provider
export type SPStackParamList = {
  // HomeScreen: undefined;
  // ProfileScreen: undefined;
};

export type RootStackParamList = {
  WelcomeStack: NavigatorScreenParams<WelcomeStackParamList>;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  AppDrawer: NavigatorScreenParams<AppDrawerParamList>;
  AppStack: NavigatorScreenParams<AppStackParamList>;
  SPStack: NavigatorScreenParams<SPStackParamList>;
};

// const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
// const route = useRoute<RouteProp<AuthStackParamList, 'LoginScreen'>>();

//  ------ Temporary - to understand how its working

// navigation.navigate('AuthStack'); // 👈 navigate to Auth stack
// If you're inside AuthStack and want to go to a screen in WelcomeStack, you can do:

// navigation.navigate('WelcomeStack', {
//   screen: 'WelcomeScreen', // 👈 nested screen
// });

// You can even conditionally redirect users to another stack based on some auth state: ??

// if (!user) {
//   navigation.reset({
//     index: 0,
//     routes: [{ name: 'AuthStack', params: { screen: 'LoginScreen' } }],
//   });
// }

// Or on logout: ??

// navigation.reset({
//   index: 0,
//   routes: [{ name: 'WelcomeStack', params: { screen: 'SplashScreen' } }],
// });

// passing params examples ??

// navigation.push('WelcomeStack', {
//   screen: 'WelcomeScreen',
//   params: {
//     userId: 'abc123', // or whatever your screen expects
//   },
// });

// export type WelcomeStackParamList = {
//   SplashScreen: undefined;
//   WelcomeScreen: { userId: string }; // 👈 expecting a param
//   OnboardingScreen: undefined;
//   UserTypeSelectScreen: undefined;
// };

// getting params

// import { RouteProp, useRoute } from '@react-navigation/native';

// const route = useRoute<RouteProp<WelcomeStackParamList, 'WelcomeScreen'>>();
// _logger.log(route.params.userId); // 👉 'abc123'
