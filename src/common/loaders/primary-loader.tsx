import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {_color} from '../../misc';

const PrimaryLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={_color.primary} />
    </View>
  );
};

export default PrimaryLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: _color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
