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
  searchScreen: 'SearchScreen',
  selectCarType: 'SelectCarType',
  uploadPictureOfVehicle: 'UploadPictureOfVehicle',
  searchResultScreen: 'SearchResultScreen',
  bookingDetailsProcessingInfoScreen: 'BookingDetailsProcessingInfoScreen',
  historyDetailsScreen: 'HistoryDetailsScreen',

  profileScreen: 'ProfileScreen',
  historyScreen: 'HistoryScreen',

  // modal
  // searchScreen: 'SearchScreen',

  // drawer
  drawerNavigator: 'DrawerNavigator',
  dashboardScreen: 'DashboardScreen',

  // sp drawer
  SPDrawerNavigator: 'SPDrawerNavigator',
  SPDashboardScreen: 'SPDashboardScreen',
} as const;
