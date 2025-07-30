import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute, RouteProp } from '@react-navigation/native';
import { DashboardScreen } from '../presentation';
import { SCREENS } from '../misc';
import { CustomDrawerContent } from './components';
import { logger } from '../utils';
import { DrawerNavigatorParamList, RootStackParamList } from './types/types';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <CustomDrawerContent {...props} />;

const DrawerNavigator = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'DrawerNavigator'>>();
  // const initialScreen = (route?.params?.screen as keyof DrawerNavigatorParamList) || SCREENS.dashboardScreen;
  // logger.log('DrawerNavigator ==-->', initialScreen);

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      // initialRouteName={route?.params?.screen || SCREENS.dashboardScreen}
      initialRouteName={SCREENS.dashboardScreen}
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: 'front',
      })}
    >
      <Drawer.Screen name={SCREENS.dashboardScreen} component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
