import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {_styles, _isIOS, _color, _ms, _mvs} from '../../misc';
import {SafeAreaWrapper, PrimaryHeader} from '../../presentation/components';

const ForgotPassword = () => {
  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper style={styles.container}>
        <PrimaryHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollViewStyle}
          contentContainerStyle={styles.contentContainerStyle}>
          <Text>Hek</Text>
        </ScrollView>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const gapAndMargin = _mvs(20);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _ms(18),
    backgroundColor: _color.white,
  },
  ScrollViewStyle: {
    paddingTop: _mvs(16),
  },
  contentContainerStyle: {
    rowGap: gapAndMargin,
  },
});
