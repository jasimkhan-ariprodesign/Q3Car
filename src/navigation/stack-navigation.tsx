import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {OnboardingScreen, SplashScreen} from '../presentation';
import {_color, _screens} from '../misc';
import WelcomeScreen from '../presentation/screens/welcome/welcome-screen';
import WelcomeNavigation from './welcome-navigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.welcomeNavigation}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {/* <Stack.Screen name={_screens.splash} component={SplashScreen} /> */}
      {/* <Stack.Screen name={_screens.onboardingScreen} component={OnboardingScreen} /> */}
      {/* <Stack.Screen name={_screens.welcomeScreen} component={WelcomeScreen} /> */}
      <Stack.Screen name={_screens.welcomeNavigation} component={WelcomeNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
