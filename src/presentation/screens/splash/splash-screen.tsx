import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {_color, _height, _styles, _width} from '../../../misc';
import {_images} from '../../../assets/images';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={_images.splash} style={styles.bgImage} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _color.white,
  },
  bgImage: {
    width: _width,
    height: _height,
  },
});
