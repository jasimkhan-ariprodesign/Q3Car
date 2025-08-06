import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { COLORS, SCREENS } from '../misc';
import { AuthStackParamList } from './types/types';
import {
  ForgotPassword,
  LoginScreen,
  ResetPassword,
  SetPassword,
  SignupScreen,
  SPLoginScreen,
  SPSignupScreen,
} from '../auth';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.signupScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS?.white },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name={SCREENS.signupScreen} component={SignupScreen} />
      <Stack.Screen name={SCREENS.loginScreen} component={LoginScreen} />
      <Stack.Screen name={SCREENS.spSignupScreen} component={SPSignupScreen} />
      <Stack.Screen name={SCREENS.forgotPassword} component={ForgotPassword} />
      <Stack.Screen name={SCREENS.setPassword} component={SetPassword} />
      <Stack.Screen name={SCREENS.spLoginScreen} component={SPLoginScreen} />
      <Stack.Screen name={SCREENS.resetPassword} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthStack;
