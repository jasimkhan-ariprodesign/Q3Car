import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import {SPStackParamList} from './types/types';

const Stack = createStackNavigator<SPStackParamList>();

const SPStack = () => {
  return (
    <Stack.Navigator
      // initialRouteName={_screens.signupScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      {/* customer */}
      {/* <Stack.Screen name={_screens.signupScreen} component={SignupScreen} />
      <Stack.Screen name={_screens.loginScreen} component={LoginScreen} /> */}
    </Stack.Navigator>
  );
};

export default SPStack;
