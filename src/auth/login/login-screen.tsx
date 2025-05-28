import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { _fonts } from '../../assets';
import { _ms, _color, _mvs } from '../../misc';
import { SafeAreaWrapper, PrimaryHeader } from '../../presentation/components';


const LoginScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <PrimaryHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollViewStyle}>
        <View>
          <Text style={styles.title}>
            Hello!{'\n'}Sign in to{'\n'}get started
          </Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _ms(18),
    backgroundColor: _color.white,
  },
  ScrollViewStyle: {
    paddingTop: _mvs(16),
  },
  title: {
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(20),
  },
});
