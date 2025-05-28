import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import {OnboardingScreen, SplashScreen, UserTypeSelectScreen, WelcomeScreen} from '../presentation';
import {WelcomeStackParamList} from './types/types';

// const Stack = createStackNavigator();
const Stack = createStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.splash} component={SplashScreen} />
      <Stack.Screen name={_screens.onboardingScreen} component={OnboardingScreen} />
      <Stack.Screen name={_screens.userTypeSelectScreen} component={UserTypeSelectScreen} />
      <Stack.Screen name={_screens.welcomeScreen} component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
