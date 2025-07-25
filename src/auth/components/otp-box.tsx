import { Button, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React, { useRef } from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { COLORS, MS, MVS } from '../../misc';
import { FONTS } from '../../assets';
import { TextButton } from '../../presentation/components';

interface OTPBoxProp {
  otpInpHeight?: number;
  containerStyle?: ViewStyle;
  resendContainerStyle?: ViewStyle;
  handleOptInput?: (otp: string) => void;
  timeLeft?: number;
  resendFunction?: () => void;
  sendFunction?: () => void;
  otpRef?: any;
}

const OTPBox: React.FC<OTPBoxProp> = ({
  otpInpHeight = MS(36),
  containerStyle,
  resendContainerStyle,
  handleOptInput,
  timeLeft,
  resendFunction,
  sendFunction,
  otpRef,
}) => {
  const styles = Styles(otpInpHeight);
  const resendVisible = timeLeft != undefined && timeLeft === 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <OtpInput
        ref={otpRef}
        numberOfDigits={5}
        onTextChange={text => {
          handleOptInput && handleOptInput(text);
        }}
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

      <TextButton title="Verify" textStyle={styles.resendText} onPress={sendFunction} disabled={false} />

      <View style={[resendVisible ? styles.resendButtonContVisible : styles.resendButtonCont, resendContainerStyle]}>
        <Text style={styles.text}>{(timeLeft && timeLeft.toString()) || ''} Didn't receive code? </Text>
        <TextButton title="Resend again" textStyle={styles.resendText} onPress={resendFunction} disabled={false} />
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
      fontSize: MS(14),
      fontFamily: FONTS.workSansMedium,
    },
  });
};
