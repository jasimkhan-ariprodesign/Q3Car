import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {SafeAreaWrapper} from '../../presentation/components';

const SuccessScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <Text>Congratulations!</Text>
    </SafeAreaWrapper>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
