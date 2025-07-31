import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SPDashboardScreen } from '../presentation';
import SPDrawerContent from './components/SPDrawerContent/sp-drawer-content';
import { SCREENS } from '../misc';
import { logger } from '../utils';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <SPDrawerContent {...props} />;

const SPDrawerNavigator = () => {
    logger.log('render -->', );

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      initialRouteName={SCREENS.SPDashboardScreen}
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: true,
        swipeEnabled: true,
        drawerType: 'front',
      })}
    >
      <Drawer.Screen name={SCREENS.SPDashboardScreen} component={SPDashboardScreen} />
    </Drawer.Navigator>
  );
};

export default SPDrawerNavigator;
