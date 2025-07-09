import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, _ms, _mvs, COMMON_STYLES} from '../../../../misc';
import {_fonts, _images} from '../../../../assets';
import {PrimaryButton, TextButton} from '../../../components';

const LocationPermissionPopup = ({onPress}: {onPress: any}) => {
  return (
    <View style={styles.container}>
      <Image source={_images.location} style={styles.imgStyle} />
      <View>
        <Text style={styles.title}>Enable your location</Text>
        <Text style={styles.descString}>
          Choose your location to start find the {'\n'} request around you
        </Text>
      </View>

      <PrimaryButton
        title="Use my location"
        onPress={() => Alert.alert('!', 'you pressed Use my location')}
      />

      <TextButton
        title="Skip for now"
        buttonStyle={styles.skipBtn}
        onPress={onPress}
        disabled={false}
      />
    </View>
  );
};

export default LocationPermissionPopup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingVertical: _mvs(20),
    paddingHorizontal: _ms(12),
    borderRadius: 10,
    minWidth: '80%',
    rowGap: _mvs(22),
    marginTop: -_mvs(50),
  },
  imgStyle: {
    ...COMMON_STYLES.size90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    color: COLORS.black,
    fontSize: _ms(16),
    fontFamily: _fonts.workSansMedium,
    textAlign: 'center',
    marginBottom: _mvs(4),
  },
  descString: {
    color: COLORS.textPrimary,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
    textAlign: 'center',
  },
  skipBtn: {
    alignSelf: 'center',
  },
});
