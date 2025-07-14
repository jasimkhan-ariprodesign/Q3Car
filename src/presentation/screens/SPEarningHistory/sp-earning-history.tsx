import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper, PrimaryHeader} from '../../components';
import {COMMON_STYLES} from '../../../misc';

const SPEarningHistory = () => {
  return (
    <SafeAreaWrapper>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={COMMON_STYLES.flex}>
        <Text>SPEarningHistory</Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default SPEarningHistory;

const styles = StyleSheet.create({});
