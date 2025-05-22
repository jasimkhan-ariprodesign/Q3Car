import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {OnboardingScreen, SplashScreen} from '../presentation';
import {_color, _screen} from '../misc';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screen.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screen.splash} component={SplashScreen} />
      <Stack.Screen name={_screen.onboardingScreen} component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
