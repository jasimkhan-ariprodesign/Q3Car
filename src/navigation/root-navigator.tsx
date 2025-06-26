import React from 'react';
import {StyleSheet} from 'react-native';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import WelcomeStack from './welcome-stack';
import AuthStack from './auth-stack';
import AppStack from './app-stack';
import DrawerNavigator from './drawer-navigator';
import {RootStackParamList} from './types/types';
import {_color, _screens} from '../misc';

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
      <Stack.Screen name={_screens.drawerNavigator} component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: _color?.white,
  },
});
