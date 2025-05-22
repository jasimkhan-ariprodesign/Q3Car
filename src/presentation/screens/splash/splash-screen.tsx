import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {_color} from '../../../misc';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _color.white,
  },
});
