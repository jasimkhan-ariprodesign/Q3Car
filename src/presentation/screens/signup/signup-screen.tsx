import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrimaryHeader, SafeAreaWrapper} from '../../components';
import {_color, _ms} from '../../../misc';
import {_fonts} from '../../../assets';

const SignupScreen = () => {
  return (
    <SafeAreaWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryHeader />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    marginHorizontal: _ms(18),
    backgroundColor: _color.white,
  },
});
