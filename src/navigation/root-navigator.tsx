import React from 'react';
import { StyleSheet } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import WelcomeStack from './welcome-stack';
import AuthStack from './auth-stack';
import AppStack from './app-stack';
import DrawerNavigator from './drawer-navigator';
import { RootStackParamList } from './types/types';
import { COLORS, SCREENS } from '../misc';
import SPDrawerNavigator from './service-provider-drawer-navigator';
import SPStack from './service-provider-stack';
import { SignupScreen } from '../auth';
// import {BookingDetailsProcessingInfoScreen} from '../presentation';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    // <Stack.Navigator
    //   initialRouteName={SCREENS.welcomeStack}
    //   screenOptions={{
    //     headerShown: false,
    //     cardStyle: styles.cardStyle,
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //   }}>
    //   <Stack.Screen name={SCREENS.welcomeStack} component={WelcomeStack} />
    //   <Stack.Screen name={SCREENS.authStack} component={AuthStack} />
    //   <Stack.Screen name={SCREENS.appStack} component={AppStack} />
    //   <Stack.Screen name={SCREENS.drawerNavigator} component={DrawerNavigator} />
    //   <Stack.Screen name={SCREENS.SPDrawerNavigator} component={SPDrawerNavigator} />
    //   <Stack.Screen name={SCREENS.SPStack} component={SPStack} />
    // </Stack.Navigator>

    <SignupScreen />
    // <BookingDetailsProcessingInfoScreen />
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: COLORS?.white,
  },
});
