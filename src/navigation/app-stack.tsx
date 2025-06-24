import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './types/types';
import {_color, _screens} from '../misc';
import {SuccessScreen} from '../common';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.successScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.successScreen} component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
