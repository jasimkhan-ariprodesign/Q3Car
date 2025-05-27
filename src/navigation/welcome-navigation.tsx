import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import {OnboardingScreen, SignupScreen, SplashScreen, WelcomeScreen} from '../presentation';

const WelcomeStack = createStackNavigator();

const WelcomeNavigation = () => {
  return (
    <WelcomeStack.Navigator
      initialRouteName={_screens.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <WelcomeStack.Screen name={_screens.splash} component={SplashScreen} />
      <WelcomeStack.Screen name={_screens.onboardingScreen} component={OnboardingScreen} />
      <WelcomeStack.Screen name={_screens.welcomeScreen} component={WelcomeScreen} />
      <WelcomeStack.Screen name={_screens.signupScreen} component={SignupScreen} />
    </WelcomeStack.Navigator>
  );
};

export default WelcomeNavigation;
