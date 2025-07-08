import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaWrapper, PrimaryHeader, PrimaryButton} from '../../components';
import {_color, _isIOS, _ms, _mvs, _screens, _strings, _styles} from '../../../misc';
import {_fonts, _icons} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';
import {SecondaryLoader} from '../../../common';

const UploadPictureOfVehicle = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const _handleUploadClick = () => {
    navigation.push(_screens.appStack, {
      screen: _screens.searchResultScreen,
    });
  };

  const _renderCarPhotoContView = () => {
    return (
      <View style={styles.carPhotoCont}>
        <Image source={_icons.galleryGrey} style={_styles.size24} resizeMode="contain" />
        <Text style={styles.selectFileString}>{_strings.selectFile}</Text>
      </View>
    );
  };

  const _renderORView = () => {
    return (
      <View style={styles.orCont}>
        <View style={styles.horiLine} />
        <Text style={styles.selectFileString}>{_strings.or}</Text>
        <View style={styles.horiLine} />
      </View>
    );
  };

  const _renderOpenCameraBTN = () => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.openCameraBTN}>
        <Image source={_icons.cameraWhite} style={_styles.size20} resizeMode="contain" />
        <Text style={styles.openCameraString}>{_strings.openCameraAndTakePhoto}</Text>
      </TouchableOpacity>
    );
  };

  const _renderInputCont = () => {
    return (
      <View style={styles.inputCont}>
        <Text style={styles.labelString}>{'Add service-specific notes (Optional)'}</Text>
        <TextInput
          placeholder="Add service-specific notes (Optional)"
          placeholderTextColor={_color.textDisabled}
          style={styles.inputStyle}
        />
      </View>
    );
  };

  // main view
  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper style={_styles.flex}>
        <PrimaryHeader containerStyle={_styles.headerStyle} />
        <View style={[_styles.flex]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <Text style={styles.title}>{_strings.uploadThePictureOfTheVehicle}</Text>

            {/* car photo view */}
            {_renderCarPhotoContView()}

            {/* or */}
            {_renderORView()}

            {/* open camera button  */}
            {_renderOpenCameraBTN()}

            {/* Add service-specific notes Input */}
            {_renderInputCont()}

            <PrimaryButton
              title={_strings.upload}
              textStyle={styles.uploadString}
              onPress={_handleUploadClick}
            />
          </ScrollView>

          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default UploadPictureOfVehicle;

const gapAndMargin = _mvs(44);
const bdrWidth = 1.2;
const bdrColor = _color.EDEDED;
const authFieldHeight = _ms(36);

const styles = StyleSheet.create({
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(18),
    paddingTop: _mvs(12),
  },
  title: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(16),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  carPhotoCont: {
    borderWidth: 2,
    borderColor: _color.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: _mvs(8),
    minHeight: _mvs(160),
  },
  selectFileString: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
  },
  orCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: _ms(12),
    marginHorizontal: _ms(2),
  },
  horiLine: {
    height: 1.2,
    backgroundColor: _color.EDEDED,
    flex: 1,
  },
  openCameraBTN: {
    backgroundColor: _color.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: _mvs(34),
    borderRadius: 16,
    columnGap: _ms(8),
  },
  openCameraString: {
    color: _color.white,
    fontFamily: _fonts.workSansBold,
    fontSize: _ms(14),
    includeFontPadding: false,
  },
  inputCont: {
    rowGap: _mvs(4),
  },
  labelString: {
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    color: _color.textPrimary,
    includeFontPadding: false,
  },
  inputStyle: {
    padding: 0,
    borderWidth: bdrWidth,
    borderColor: bdrColor,
    borderRadius: 4,
    height: authFieldHeight,
    paddingLeft: _ms(12),

    color: _color.textPrimary,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(14),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  uploadString: {
    textTransform: 'uppercase',
  },
});
