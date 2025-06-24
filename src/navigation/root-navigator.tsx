import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {_color, _screens} from '../misc';
import WelcomeStack from './welcome-stack';
import AuthStack from './auth-stack';
import {RootStackParamList} from './types/types';
import {StyleSheet} from 'react-native';
import AppStack from './app-stack';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.welcomeStack}
      screenOptions={{
        headerShown: false,
        cardStyle: styles.cardStyle,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.welcomeStack} component={WelcomeStack} />
      <Stack.Screen name={_screens.authStack} component={AuthStack} />
      <Stack.Screen name={_screens.AppStack} component={AppStack} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: _color?.white,
  },
});
