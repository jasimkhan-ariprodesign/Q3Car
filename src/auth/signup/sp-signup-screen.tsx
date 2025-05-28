import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper, PrimaryHeader} from '../../presentation/components';
import {_ms, _color, _mvs} from '../../misc';
import {_fonts} from '../../assets';

const SPSignupScreen = () => {
  return (
    <SafeAreaWrapper style={styles.container}>
      <PrimaryHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollViewStyle}>
        <View>
          <Text style={styles.title}>Hello! Signup to{'\n'}get started</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SPSignupScreen;

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
