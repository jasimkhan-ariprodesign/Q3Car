import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrimaryButton, SafeAreaWrapper} from '../../components';
import {_color, _height, _ms, _mvs} from '../../../misc';
import {_fonts, _images} from '../../../assets';

const UserTypeSelectScreen = () => {
  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Hello!</Text>

        <Image source={_images.userType} style={styles.imgStyle} resizeMode="contain" />

        <View style={styles.buttonCont}>
          <PrimaryButton title="Find a Towing Service" />
          <PrimaryButton
            title="Publish a Towing Service"
            buttonStyle={styles.publishBtn}
            textStyle={styles.publishString}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default UserTypeSelectScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: _ms(22),
    paddingTop: _mvs(24),
    rowGap: _mvs(40),
  },
  title: {
    color: _color.black,
    fontSize: _ms(20),
    fontFamily: _fonts.workSansRegular,
  },
  imgStyle: {
    width: '100%',
    height: _height * 0.4,
  },
  buttonCont: {
    gap: _mvs(12),
  },
  publishBtn: {
    backgroundColor: _color.transparent,
    borderWidth: 1,
    borderColor: _color.primary,
    marginHorizontal: 1,
  },
  publishString: {
    color: _color.black,
  },
});
