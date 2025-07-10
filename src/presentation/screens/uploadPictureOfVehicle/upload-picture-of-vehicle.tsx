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
import {COLORS, isIOS, MS, MVS, SCREENS, STRINGS, COMMON_STYLES} from '../../../misc';
import {FONTS, ICONS} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';
import {SecondaryLoader} from '../../../common';

const UploadPictureOfVehicle = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const _handleUploadClick = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.searchResultScreen,
    });
  };

  const _renderCarPhotoContView = () => {
    return (
      <View style={styles.carPhotoCont}>
        <Image source={ICONS.galleryGrey} style={COMMON_STYLES.size24} resizeMode="contain" />
        <Text style={styles.selectFileString}>{STRINGS.selectFile}</Text>
      </View>
    );
  };

  const _renderORView = () => {
    return (
      <View style={styles.orCont}>
        <View style={styles.horiLine} />
        <Text style={styles.selectFileString}>{STRINGS.or}</Text>
        <View style={styles.horiLine} />
      </View>
    );
  };

  const _renderOpenCameraBTN = () => {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.openCameraBTN}>
        <Image source={ICONS.cameraWhite} style={COMMON_STYLES.size20} resizeMode="contain" />
        <Text style={styles.openCameraString}>{STRINGS.openCameraAndTakePhoto}</Text>
      </TouchableOpacity>
    );
  };

  const _renderInputCont = () => {
    return (
      <View style={styles.inputCont}>
        <Text style={styles.labelString}>{'Add service-specific notes (Optional)'}</Text>
        <TextInput
          placeholder="Add service-specific notes (Optional)"
          placeholderTextColor={COLORS.textDisabled}
          style={styles.inputStyle}
        />
      </View>
    );
  };

  // main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper style={COMMON_STYLES.flex}>
        <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
        <View style={[COMMON_STYLES.flex]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <Text style={styles.title}>{STRINGS.uploadThePictureOfTheVehicle}</Text>

            {/* car photo view */}
            {_renderCarPhotoContView()}

            {/* or */}
            {_renderORView()}

            {/* open camera button  */}
            {_renderOpenCameraBTN()}

            {/* Add service-specific notes Input */}
            {_renderInputCont()}

            <PrimaryButton
              title={STRINGS.upload}
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

const gapAndMargin = MVS(44);
const bdrWidth = 1.2;
const bdrColor = COLORS.EDEDED;
const authFieldHeight = MS(36);

const styles = StyleSheet.create({
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: MS(18),
    paddingTop: MVS(12),
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.workSansMedium,
    fontSize: MS(16),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  carPhotoCont: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: MVS(8),
    minHeight: MVS(160),
  },
  selectFileString: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    includeFontPadding: false,
  },
  orCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(12),
    marginHorizontal: MS(2),
  },
  horiLine: {
    height: 1.2,
    backgroundColor: COLORS.EDEDED,
    flex: 1,
  },
  openCameraBTN: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: MVS(34),
    borderRadius: 16,
    columnGap: MS(8),
  },
  openCameraString: {
    color: COLORS.white,
    fontFamily: FONTS.workSansBold,
    fontSize: MS(14),
    includeFontPadding: false,
  },
  inputCont: {
    rowGap: MVS(4),
  },
  labelString: {
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    color: COLORS.textPrimary,
    includeFontPadding: false,
  },
  inputStyle: {
    padding: 0,
    borderWidth: bdrWidth,
    borderColor: bdrColor,
    borderRadius: 4,
    height: authFieldHeight,
    paddingLeft: MS(12),

    color: COLORS.textPrimary,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(14),
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  uploadString: {
    textTransform: 'uppercase',
  },
});
