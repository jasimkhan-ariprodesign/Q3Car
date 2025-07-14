import {KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {_isIOS} from '../../../misc/platform';
import {SafeAreaWrapper} from '../../components';
import {COMMON_STYLES} from '../../../misc';

const SPUpdateProfile = () => {
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <Text>SPUpdateProfile</Text>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPUpdateProfile;

const styles = StyleSheet.create({});
