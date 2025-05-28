import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import WelcomeStack from './welcome-stack';
import AuthStack from './auth-stack';
import {RootStackParamList} from './types/types';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.welcomeStack}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.welcomeStack} component={WelcomeStack} />
      <Stack.Screen name={_screens.authStack} component={AuthStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
