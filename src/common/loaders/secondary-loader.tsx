import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React from 'react';
import {COLORS} from '../../misc';

const SecondaryLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

export default SecondaryLoader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparentBlack1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
