export const _screens = {
  // navigation stacks
  rootNavigator: 'RootNavigator',
  welcomeStack: 'WelcomeStack',
  authStack: 'AuthStack',
  AppStack: 'AppStack',

  // welcome
  splash: 'SplashScreen',
  onboardingScreen: 'OnboardingScreen',
  userTypeSelectScreen: 'UserTypeSelectScreen',
  welcomeScreen: 'WelcomeScreen',
  spWelcomeScreen: 'SPWelcomeScreen',

  // auth
  signupScreen: 'SignupScreen',
  loginScreen: 'LoginScreen',
  spSignupScreen: 'SPSignupScreen',
  forgotPassword: 'ForgotPassword',
  setPassword: 'SetPassword',
  spLoginScreen: 'SPLoginScreen',

  // app
  successScreen: 'SuccessScreen',
  profileScreen: 'ProfileScreen',

  // drawer
  drawerNavigator: 'DrawerNavigator',
  dashboardScreen: 'DashboardScreen',
} as const;
