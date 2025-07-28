import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { _getStatusBarHeight, WINDOW_HEIGHT, SCREENS, COMMON_STYLES, WINDOW_WIDTH } from '../../../misc';
import { _images } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserData, logger } from '../../../utils';

const statusBarHeight = _getStatusBarHeight();
const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleRoute = async () => {
    try {
      const user_credentials = await getUserData();
      const { userType } = user_credentials?.data?.user || {};
      // logger.log('user_credentials : ', JSON.stringify(user_credentials, null, 2));
      if (user_credentials && userType && userType === 'Customer') {
        return navigation.replace(SCREENS.drawerNavigator, {
          screen: SCREENS.dashboardScreen,
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
      // navigation.replace(SCREENS.welcomeStack, {
      //   screen: SCREENS.onboardingScreen,
      // });
      _handleRoute();
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={COMMON_STYLES.flex}>
      <ImageBackground source={_images.splash} style={styles.bgImg} />
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
