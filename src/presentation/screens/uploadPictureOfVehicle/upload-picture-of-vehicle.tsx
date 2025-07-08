import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper, PrimaryHeader} from '../../components';
import {_color, _ms, _mvs, _styles} from '../../../misc';
import {_fonts, _icons} from '../../../assets';

const UploadPictureOfVehicle = () => {
  const _renderCarPhotoContView = () => {
    return (
      <TouchableOpacity>
        <Image source={_icons.google} style={_styles.size24} resizeMode="contain" />
        <Text>Photo</Text>
      </TouchableOpacity>
    );
  };

  // main view
  return (
    <SafeAreaWrapper style={styles.container}>
      <PrimaryHeader />
      <View style={[_styles.flex, styles.spaceBetweenView]}>
        <Text style={styles.title}>Upload the picture of{'\n'}the vehicle</Text>

        {/* car photo view */}
        {_renderCarPhotoContView()}
      </View>
    </SafeAreaWrapper>
  );
};

export default UploadPictureOfVehicle;

const gapAndMargin = _mvs(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  container: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(18),
  },
  spaceBetweenView: {
    rowGap: gapAndMargin,
  },
  title: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(16),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  desc: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(12),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
});
