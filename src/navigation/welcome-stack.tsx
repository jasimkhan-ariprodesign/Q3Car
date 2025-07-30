import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { RouteProp, useRoute } from '@react-navigation/native';
import { COLORS, SCREENS } from '../misc';
import { OnboardingScreen, SplashScreen, SPWelcomeScreen, UserTypeSelectScreen, WelcomeScreen } from '../presentation';
import { RootStackParamList, WelcomeStackParamList } from './types/types';
import { logger } from '../utils';

const Stack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'WelcomeStack'>>();
  // const initialScreen = (route?.params?.screen as keyof WelcomeStackParamList) || SCREENS.onboardingScreen;
  // logger.log('WelcomeStack ==-->', initialScreen);
  return (
    <Stack.Navigator
      // initialRouteName={initialScreen}
      initialRouteName={SCREENS.onboardingScreen}
      // initialRouteName={SCREENS.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS?.white },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name={SCREENS.onboardingScreen} component={OnboardingScreen} />
      <Stack.Screen name={SCREENS.userTypeSelectScreen} component={UserTypeSelectScreen} />
      <Stack.Screen name={SCREENS.welcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={SCREENS.spWelcomeScreen} component={SPWelcomeScreen} />
      <Stack.Screen name={SCREENS.splash} component={SplashScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
