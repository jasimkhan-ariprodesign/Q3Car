import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import {AuthStackParamList} from './types/types';
import {ForgotPassword, LoginScreen, SignupScreen, SPSignupScreen} from '../auth';

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
      <Stack.Screen name={_screens.loginScreen} component={LoginScreen} />
      <Stack.Screen name={_screens.spSignupScreen} component={SPSignupScreen} />
      <Stack.Screen name={_screens.forgotPassword} component={ForgotPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
