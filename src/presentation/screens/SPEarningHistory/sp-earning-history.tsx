import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper, PrimaryHeader, TextButton} from '../../components';
import {COMMON_STYLES} from '../../../misc';

const SPEarningHistory = () => {
  // main view
  return (
    <SafeAreaWrapper>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={COMMON_STYLES.flex}>
        <Text>Earning History</Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default SPEarningHistory;

const styles = StyleSheet.create({
  contentContainerStyle: {},
});
