import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashboardScreen} from '../presentation';
import {SCREENS} from '../misc';
import {CustomDrawerContent} from './components';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <CustomDrawerContent {...props} />;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName={SCREENS.dashboardScreen}
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: 'front',
      })}>
      <Drawer.Screen name={SCREENS.dashboardScreen} component={DashboardScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
