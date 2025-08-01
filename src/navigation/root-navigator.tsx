import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import WelcomeStack from './welcome-stack';
import AuthStack from './auth-stack';
import AppStack from './app-stack';
import DrawerNavigator from './drawer-navigator';
import SPDrawerNavigator from './service-provider-drawer-navigator';
import SPStack from './service-provider-stack';
import { COLORS, SCREENS } from '../misc';
import { RootStackParamList } from './types/types';
import { loadStoredUserAndNavigate } from './hooks';
import { InitialRouteInfo } from './hooks/load-stored-user-and-navigate';
import { DashboardScreen } from '../presentation';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [initialRouteInfo, setInitialRouteInfo] = useState<InitialRouteInfo | null>(null);

  const fetchInitialRoute = async () => {
    try {
      const routeInfo = await loadStoredUserAndNavigate();
      setInitialRouteInfo(routeInfo);
    } catch (error) {
      setInitialRouteInfo({ name: SCREENS.welcomeStack });
    } finally {
      setIsLoading(false);
      // await BootSplash.hide({ fade: true });
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     fetchInitialRoute();
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) return null;

  return (
    // <Stack.Navigator
    //   // initialRouteName={initialRouteInfo?.name}
    //   initialRouteName={SCREENS.welcomeStack}
    //   screenOptions={{
    //     headerShown: false,
    //     cardStyle: styles.cardStyle,
    //     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    //   }}
    // >
    //   <Stack.Screen name={SCREENS.welcomeStack} component={WelcomeStack} />
    //   <Stack.Screen name={SCREENS.authStack} component={AuthStack} />
    //   <Stack.Screen name={SCREENS.appStack} component={AppStack} />
    //   <Stack.Screen name={SCREENS.drawerNavigator} component={DrawerNavigator} />
    //   <Stack.Screen name={SCREENS.SPDrawerNavigator} component={SPDrawerNavigator} />
    //   <Stack.Screen name={SCREENS.SPStack} component={SPStack} />
    // </Stack.Navigator>
    <DashboardScreen />
  );
};

export default RootNavigator;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: COLORS?.white,
  },
});
