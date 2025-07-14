import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {SPDashboardScreen} from '../presentation';
import SPDrawerContent from './components/SPDrawerContent/sp-drawer-content';
import {SCREENS} from '../misc';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <SPDrawerContent {...props} />;

const SPDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName={SCREENS.SPDashboardScreen}
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: 'front',
      })}>
      <Drawer.Screen name={SCREENS.SPDashboardScreen} component={SPDashboardScreen} />
    </Drawer.Navigator>
  );
};

export default SPDrawerNavigator;
