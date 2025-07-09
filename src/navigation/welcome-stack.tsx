import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {COLORS, SCREENS} from '../misc';
import {OnboardingScreen, SplashScreen, SPWelcomeScreen, UserTypeSelectScreen, WelcomeScreen} from '../presentation';
import {WelcomeStackParamList} from './types/types';

const Stack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: COLORS?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={SCREENS.splash} component={SplashScreen} />
      <Stack.Screen name={SCREENS.onboardingScreen} component={OnboardingScreen} />
      <Stack.Screen name={SCREENS.userTypeSelectScreen} component={UserTypeSelectScreen} />
      <Stack.Screen name={SCREENS.welcomeScreen} component={WelcomeScreen} />
      <Stack.Screen name={SCREENS.spWelcomeScreen} component={SPWelcomeScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
