import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const RenderMap = () => {
  return (
    <View style={styles.conatiner}>
      <Text>Map</Text>
    </View>
  );
};

export default RenderMap;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
