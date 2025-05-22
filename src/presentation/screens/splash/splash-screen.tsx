import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {_getStatusBarHeight, _height, _screen, _styles, _width} from '../../../misc';
import {_images} from '../../../assets/images';
import {useNavigation} from '@react-navigation/native';

const statusBarHeight = _getStatusBarHeight();
const SplashScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(_screen.onboardingScreen);
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={_styles.flex}>
      <ImageBackground source={_images.splash} style={styles.bgImg} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  bgImg: {
    width: _width,
    height: _height + statusBarHeight,
  },
});
