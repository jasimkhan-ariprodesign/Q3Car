import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CustomBottomShitModal} from '../../presentation/components';
import {COLORS, COMMON_STYLES, isIOS, MS, MVS, useCustomSafeAreaInsets} from '../../misc';
import {EdgeInsets} from 'react-native-safe-area-context';
import {FONTS, ICONS} from '../../assets';

interface CameraOrGalleryPopupProp {
  closePopupFunc?: Function;
  activeOpacity?: number;
  onSelectImageType?: (type: 'Camera' | 'Gallery') => void;
}

const CameraOrGalleryPopup: React.FC<CameraOrGalleryPopupProp> = ({
  closePopupFunc,
  activeOpacity = 0.6,
  onSelectImageType,
}) => {
  const insets = useCustomSafeAreaInsets();
  const styles = getStyle(insets);

  const _handleClosePopupFunc = () => {
    closePopupFunc && closePopupFunc();
  };

  const _handleCameraClick = () => {
    onSelectImageType && onSelectImageType('Camera');
  };

  const _handleGalleryClick = () => {
    onSelectImageType && onSelectImageType('Gallery');
  };

  return (
    <CustomBottomShitModal animationValue={200} backdropStyle={styles.backdropStyle}>
      <View style={styles.container}>
        <Pressable onPress={_handleClosePopupFunc} style={COMMON_STYLES.flex} />

        <View style={styles.buttonCont}>
          <TouchableOpacity
            onPress={_handleCameraClick}
            style={styles.commonBTN}
            activeOpacity={activeOpacity}>
            <Image
              source={ICONS.cameraWhite}
              style={COMMON_STYLES.size14}
              resizeMode="contain"
              tintColor={COLORS.black}
            />

            <Text style={styles.commonString}>{'Camera'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={_handleGalleryClick}
            style={styles.commonBTN}
            activeOpacity={activeOpacity}>
            <Image
              source={ICONS.galleryGrey}
              style={COMMON_STYLES.size14}
              resizeMode="contain"
              tintColor={COLORS.black}
            />

            <Text style={styles.commonString}>{'Gallery'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBottomShitModal>
  );
};

export default CameraOrGalleryPopup;

const getStyle = (insets: EdgeInsets) =>
  StyleSheet.create({
    backdropStyle: {
      opacity: 0.2,
      backgroundColor: COLORS.transparentBlack1,
    },
    container: {
      flex: 1,
      width: '100%',
    },
    buttonCont: {
      backgroundColor: COLORS.white,
      paddingTop: MVS(28),
      paddingBottom: MVS(28) + insets?.bottom || 0,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      rowGap: MVS(12),

      ...(isIOS() ? COMMON_STYLES.shadow4 : {}),
      borderTopWidth: 1,
      borderColor: COLORS.lightGray,
    },

    commonBTN: {
      backgroundColor: COLORS.white,
      marginHorizontal: MS(18),
      height: MVS(32),
      borderRadius: 820,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',

      ...COMMON_STYLES.shadow1,
      borderWidth: 1,
      borderColor: COLORS.lightGray,
    },
    commonString: {
      color: COLORS.black,
      fontSize: MS(12),
      fontFamily: FONTS.poppinsMedium,
      includeFontPadding: false,
      minWidth: MS(80),
      textAlign: 'center',
    },
  });
