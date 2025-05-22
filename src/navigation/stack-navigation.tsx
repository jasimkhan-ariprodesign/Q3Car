import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {OnboardingScreen, SplashScreen} from '../presentation';
import {_color, _isAndroid, _screen} from '../misc';

const Stack = createStackNavigator();

const StackNavigation = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName={_screen.splash}
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: _color?.white || '',
          paddingBottom: _isAndroid() ? insets?.bottom || 0 : 0,
        },
      }}>
      <Stack.Screen name={_screen.splash} component={SplashScreen} />
      <Stack.Screen name={_screen.onboardingScreen} component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
