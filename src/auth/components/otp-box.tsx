import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {COLORS, MS, MVS} from '../../misc';
import {FONTS} from '../../assets';
import {TextButton} from '../../presentation/components';
import { logger } from '../../utils';

interface OTPBoxProp {
  otpInpHeight?: number;
  resendVisible?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  resendContainerStyle?: ViewStyle;
}

const OTPBox: React.FC<OTPBoxProp> = ({
  otpInpHeight = MS(36),
  resendVisible = false,
  onPress,
  containerStyle,
  resendContainerStyle,
}) => {
  const styles = Styles(otpInpHeight);

  return (
    <View style={[styles.container, containerStyle]}>
      <OtpInput
        numberOfDigits={5}
        onTextChange={text => logger.log(text)}
        autoFocus={false}
        theme={{
          containerStyle: styles.containerStyle,
          pinCodeContainerStyle: styles.pinCodeContainerStyle,
          filledPinCodeContainerStyle: styles.filledPinCodeContainerStyle,
          pinCodeTextStyle: styles.pinCodeTextStyle,
          focusStickStyle: styles.focusStickStyle,
          focusedPinCodeContainerStyle: styles.focusedPinCodeContainerStyle,
        }}
      />
      <View
        style={[
          resendVisible ? styles.resendButtonContVisible : styles.resendButtonCont,
          resendContainerStyle,
        ]}>
        <Text style={styles.text}>Didn't receive code? </Text>
        <TextButton title="Resend again" textStyle={styles.resendText} onPress={onPress} />
      </View>
    </View>
  );
};

export default OTPBox;

const Styles = (otpInpHeight: number) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      rowGap: MVS(12),
    },
    containerStyle: {
      justifyContent: 'center',
      columnGap: MS(8),
    },
    pinCodeContainerStyle: {
      height: otpInpHeight,
      width: otpInpHeight + MS(4),
      borderRadius: 8,
      backgroundColor: COLORS.white,
      borderWidth: 1.5,
    },
    filledPinCodeContainerStyle: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.black,
      borderWidth: 1.5,
    },
    pinCodeTextStyle: {
      color: COLORS.textPrimary,
      fontSize: MS(14),
      fontFamily: FONTS.workSansMedium,
      includeFontPadding: false,
    },
    focusStickStyle: {
      backgroundColor: COLORS.primary,
    },
    focusedPinCodeContainerStyle: {
      borderWidth: 1.5,
      borderColor: COLORS.primary,
    },
    // text style
    text: {
      color: COLORS.black,
      fontSize: MS(12),
      fontFamily: FONTS.workSansMedium,
    },
    resendButtonCont: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 0.4,
    },
    resendButtonContVisible: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 1,
    },
    resendText: {
      color: COLORS.primary,
      fontSize: MS(12),
      fontFamily: FONTS.workSansMedium,
    },
  });
};
