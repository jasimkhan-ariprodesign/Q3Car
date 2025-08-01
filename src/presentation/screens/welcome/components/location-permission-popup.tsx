import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS, MS, MVS, COMMON_STYLES } from '../../../../misc';
import { FONTS, IMAGES } from '../../../../assets';
import { PrimaryButton, TextButton } from '../../../components';

interface LocationPermissionPopupProp {
  skip?: Function;
  useMyLocation?: Function;
}

const LocationPermissionPopup = ({ skip, useMyLocation }: LocationPermissionPopupProp) => {
  return (
    <View style={styles.container}>
      <Image source={IMAGES.location} style={styles.imgStyle} />
      <View>
        <Text style={styles.title}>Enable your location</Text>
        <Text style={styles.descString}>Choose your location to start find the {'\n'} request around you</Text>
      </View>

      <PrimaryButton title="Use my location" onPress={() => useMyLocation && useMyLocation()} />

      <TextButton title="Skip for now" buttonStyle={styles.skipBtn} onPress={() => skip && skip()} disabled={false} />
    </View>
  );
};

export default LocationPermissionPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: MVS(20),
    paddingHorizontal: MS(12),
    borderRadius: 10,
    minWidth: '80%',
    rowGap: MVS(22),
    marginTop: -MVS(50),
  },
  imgStyle: {
    ...COMMON_STYLES.size90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.black,
    fontSize: MS(16),
    fontFamily: FONTS.workSansMedium,
    textAlign: 'center',
    marginBottom: MVS(4),
  },
  descString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    textAlign: 'center',
  },
  skipBtn: {
    alignSelf: 'center',
  },
});
