import {StyleSheet, Text} from 'react-native';
import React from 'react';

import {SafeAreaWrapper} from '../../components';

const OnboardingScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <Text>OnboardingScreen</Text>
    </SafeAreaWrapper>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});
