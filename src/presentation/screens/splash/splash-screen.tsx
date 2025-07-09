import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {_getStatusBarHeight, WINDOW_HEIGHT, SCREENS, COMMON_STYLES, WINDOW_WIDTH} from '../../../misc';
import {_images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';

const statusBarHeight = _getStatusBarHeight();
const SplashScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(SCREENS.onboardingScreen);
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
