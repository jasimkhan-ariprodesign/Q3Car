export const _screens = {
  // navigation stacks
  rootNavigator: 'RootNavigator',
  welcomeStack: 'WelcomeStack',
  authStack: 'AuthStack',
  appStack: 'AppStack',
  modalStack: 'ModalStack',

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
  searchScreen: 'SearchScreen',
  selectCarType: 'SelectCarType',

  // modal
  // searchScreen: 'SearchScreen',

  // drawer
  drawerNavigator: 'DrawerNavigator',
  dashboardScreen: 'DashboardScreen',
} as const;
