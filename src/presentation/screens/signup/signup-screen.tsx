import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrimaryHeader, SafeAreaWrapper} from '../../components';

const SignupScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <PrimaryHeader />
      <Text>SignupScreen</Text>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
});
