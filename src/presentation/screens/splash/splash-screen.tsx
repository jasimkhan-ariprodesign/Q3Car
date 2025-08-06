import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { IMAGES } from '../../../assets';
import { getUserData, logger } from '../../../utils';
import { RootStackParamList } from '../../../navigation/types/types';
import { _getStatusBarHeight, WINDOW_HEIGHT, SCREENS, COMMON_STYLES, WINDOW_WIDTH } from '../../../misc';
import { setUserData } from '../../../redux/slices/userSlice';

const statusBarHeight = _getStatusBarHeight();
const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

  const _handleRoute = async () => {
    try {
      const user_credentials = await getUserData();
      const { userType } = user_credentials?.data?.user || {};
      // const { userType } = {};
      // logger.log('user_credentials : ', JSON.stringify(user_credentials, null, 2));
      if (user_credentials && userType && userType === 'Customer') {
        dispatch(setUserData(user_credentials));
        return navigation.replace(SCREENS.drawerNavigator, {
          screen: SCREENS.dashboardScreen,
        });
      }

      if (user_credentials && userType && userType === 'ServiceProvider') {
        dispatch(setUserData(user_credentials));
        return navigation.replace(SCREENS.SPDrawerNavigator, {
          screen: SCREENS.SPDashboardScreen,
        });
      }

      navigation.replace(SCREENS.welcomeStack, {
        screen: SCREENS.onboardingScreen,
      });
    } catch (error) {
      logger.log('_handleRoute error : ', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      _handleRoute();
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={COMMON_STYLES.flex}>
      <ImageBackground source={IMAGES.splash} style={styles.bgImg} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  bgImg: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT + statusBarHeight,
  },
});
