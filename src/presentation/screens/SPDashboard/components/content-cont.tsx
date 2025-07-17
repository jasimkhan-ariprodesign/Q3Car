import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../../../../misc';

const ContentCont = () => {
  return (
    <View style={styles.container}>
      <Text>ContentCont</Text>
    </View>
  );
};

export default ContentCont;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.info,
  },
});
