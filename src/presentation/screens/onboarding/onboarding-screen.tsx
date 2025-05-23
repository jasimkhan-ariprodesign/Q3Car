import {Alert, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Button, SafeAreaWrapper} from '../../components';
import {_color} from '../../../misc';
import {_onboardingData} from '../../../constant';

const OnboardingScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <Text>OnboardingScreen </Text>

      <View style={{flexDirection: 'row'}}>
        <Button
          title="Skip"
          textStyle={{fontSize: 30, fontFamily: 'Poppins-Regular'}}
          // buttonStyle={{backgroundColor: 'red'}}
        />
      </View>
    </SafeAreaWrapper>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: _color.white,
  },
});
