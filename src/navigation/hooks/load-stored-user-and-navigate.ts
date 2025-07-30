import { SCREENS } from '../../misc';
import { getUserData, logger } from '../../utils';
import { RootStackParamList } from '../types/types';

export interface InitialRouteInfo {
  name: keyof RootStackParamList;
  params?: RootStackParamList[keyof RootStackParamList];
}

export const loadStoredUserAndNavigate = async (): Promise<InitialRouteInfo> => {
  try {
    const user_credentials = await getUserData();
    // const { userType } = user_credentials?.data?.user || {};
    const { userType } = {};
    // logger.log('user_credentials : ', JSON.stringify(user_credentials, null, 2));
    if (user_credentials && userType && userType === 'Customer') {
      return {
        name: SCREENS.drawerNavigator,
        params: { screen: SCREENS.dashboardScreen },
      };
    }

    if (user_credentials && userType && userType === 'ServiceProvider') {
      return {
        name: SCREENS.SPDrawerNavigator,
        params: { screen: SCREENS.SPDashboardScreen },
      };
    }

    return {
      name: SCREENS.welcomeStack,
      params: { screen: SCREENS.onboardingScreen },
    };
  } catch (error) {
    logger.log('_handleRoute error : ', error);
    return {
      name: SCREENS.welcomeStack,
      params: { screen: SCREENS.onboardingScreen },
    };
  }
};
