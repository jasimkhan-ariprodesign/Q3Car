import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper} from '../../components';
import {_color, _height, _ms, _mvs} from '../../../misc';
import {_fonts, _images} from '../../../assets';

const UserTypeSelectScreen = () => {
  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Hello!</Text>

        <Image source={_images.userType} style={styles.imgStyle} />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default UserTypeSelectScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: _ms(20),
    paddingTop: _mvs(24),
  },
  title: {
    color: _color.black,
    fontSize: _ms(20),
    fontFamily: _fonts.workSansRegular,
  },
  imgStyle: {
    width: '100%',
    height: _height * 0.3,
  },
});
