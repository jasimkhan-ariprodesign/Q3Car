import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import {SignupScreen} from '../presentation';
import {AuthStackParamList} from './types/types';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.signupScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.signupScreen} component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
