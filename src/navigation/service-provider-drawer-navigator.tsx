import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRoute, RouteProp } from '@react-navigation/native';
import { SPDashboardScreen } from '../presentation';
import SPDrawerContent from './components/SPDrawerContent/sp-drawer-content';
import { SCREENS } from '../misc';
import { logger } from '../utils';
import { RootStackParamList, SPDrawerNavigatorParamList } from './types/types';

const Drawer = createDrawerNavigator();
const CustomDrawer = (props: any) => <SPDrawerContent {...props} />;

const SPDrawerNavigator = () => {
  // const route = useRoute<RouteProp<RootStackParamList, 'SPDrawerNavigator'>>();
  // const initialScreen = (route?.params?.screen as keyof SPDrawerNavigatorParamList) || SCREENS.SPDashboardScreen;
  // logger.info('SPDrawerNavigator ===-->', initialScreen);
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawer}
      // initialRouteName={initialScreen}
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
