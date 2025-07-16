import {ActivityIndicator, Alert, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SwipeButton from 'rn-swipe-button';
import {EdgeInsets} from 'react-native-safe-area-context';
import {ICONS, FONTS} from '../../../../../assets';
import {useCustomSafeAreaInsets, COLORS, COMMON_STYLES, MVS, MS} from '../../../../../misc';

interface BookingProcessingComp {
  onSlide?: Function;
}

const BookingProcessingComp: React.FC<BookingProcessingComp> = ({onSlide}) => {
  const insets = useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _handleSwipeSuccess = () => {
    onSlide ? onSlide() : Alert.alert('Success', 'Cancel Action confirmed by swipe');
  };

  const _renderLoaderAndBookingStatusString = () => {
    return (
      <View style={styles.loaderAndMsgCont}>
        <ActivityIndicator color={COLORS.primary} size={'large'} />
        <Text style={styles.processingMSGString}>We are processing your booking...</Text>
        <Text style={styles.staticMsgString}>Your ride will start soon</Text>
      </View>
    );
  };

  const _renderSwipeToCancelButton = () => {
    const _thumbIconComponent = () => {
      return (
        <>
          <Image
            source={ICONS.closeBlack}
            style={COMMON_STYLES.size14}
            resizeMode="contain"
            tintColor={COLORS._979797}
          />
        </>
      );
    };

    return (
      <View style={styles.swipeBTNCont}>
        <SwipeButton
          // disabled={loader} // for loader
          swipeSuccessThreshold={90}
          shouldResetAfterSuccess={true}
          disableResetOnTap={false}
          title="SLIDE TO CANCEL"
          titleStyles={styles.slideToCancelString}
          railFillBackgroundColor={COLORS.transparentWhite1}
          railBorderColor={COLORS.transparentWhite1}
          railFillBorderColor={COLORS.transparent}
          railBackgroundColor={COLORS.primary}
          thumbIconBackgroundColor={COLORS.white}
          thumbIconBorderColor={COLORS.white}
          thumbIconComponent={_thumbIconComponent}
          onSwipeSuccess={_handleSwipeSuccess}
          finishRemainingSwipeAnimationDuration={300}
          resetAfterSuccessAnimDelay={200}
        />
      </View>
    );
  };

  // main view
  return (
    <View style={styles.container}>
      {/* booking process loader */}
      {_renderLoaderAndBookingStatusString()}

      {/* swipe to cancel button */}
      {_renderSwipeToCancelButton()}
    </View>
  );
};

export default BookingProcessingComp;

const gap = MVS(18);

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS.white,
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginTop: -MVS(16),
      paddingBottom: insets?.bottom || gap,
      paddingTop: gap,
      rowGap: gap,
    },
    loaderAndMsgCont: {
      alignItems: 'center',
      rowGap: gap,
    },
    processingMSGString: {
      color: COLORS.textPrimary,
      fontSize: MS(14),
      fontFamily: FONTS.workSansBold,
      includeFontPadding: false,
      textTransform: 'uppercase',
    },
    staticMsgString: {
      color: COLORS.textPrimary,
      fontSize: MS(12),
      fontFamily: FONTS.workSansRegular,
      includeFontPadding: false,
    },
    slideToCancelString: {
      color: COLORS.white,
      fontSize: MS(14),
      fontFamily: FONTS.workSansBold,
    },
    swipeBTNCont: {
      paddingHorizontal: MS(12),
    },
  });
