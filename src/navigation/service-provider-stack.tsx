import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {COLORS, SCREENS} from '../misc';
import {SPStackParamList} from './types/types';
import {SPEarningHistory, SPProfileScreen, SPUpdateProfile} from '../presentation';

const Stack = createStackNavigator<SPStackParamList>();

const SPStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SPProfileScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: COLORS?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={SCREENS.SPProfileScreen} component={SPProfileScreen} />
      <Stack.Screen name={SCREENS.SPUpdateProfile} component={SPUpdateProfile} />
      <Stack.Screen name={SCREENS.SPEarningHistory} component={SPEarningHistory} />
    </Stack.Navigator>
  );
};

export default SPStack;
