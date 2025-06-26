import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DashboardScreen, ProfileScreen} from '../presentation';
import {_screens} from '../misc';
import CustomDrawerContent from './components/customDrawerContent/custom-drawer-content';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <CustomDrawerContent {...props} />;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer} initialRouteName={_screens.dashboardScreen}>
      <Drawer.Screen name={_screens.dashboardScreen} component={DashboardScreen} />
      <Drawer.Screen name={_screens.profileScreen} component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
