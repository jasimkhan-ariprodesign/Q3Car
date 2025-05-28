import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OtpInput} from 'react-native-otp-entry';
import {_color, _ms} from '../../misc';
import {_fonts} from '../../assets';
import {TextButton} from '../../presentation/components';

interface OTPBoxProp {
  otpInpHeight?: number;
}

const OTPBox: React.FC<OTPBoxProp> = ({otpInpHeight = _ms(36)}) => {
  const styles = Styles(otpInpHeight);

  return (
    <View style={styles.container}>
      <OtpInput
        numberOfDigits={5}
        onTextChange={text => console.log(text)}
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
      <View style={[styles.resendContInVisible]}>
        <Text style={styles.text}>Didn't receive code? </Text>
        <TextButton title="Resend again" textStyle={styles.text} />
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
    },
    containerStyle: {
      justifyContent: 'center',
      columnGap: _ms(8),
    },
    pinCodeContainerStyle: {
      height: otpInpHeight,
      width: otpInpHeight + _ms(4),
      borderRadius: 8,
      backgroundColor: _color.white,
      borderWidth: 1.5,
    },
    filledPinCodeContainerStyle: {
      backgroundColor: _color.white,
      borderColor: _color.black,
      borderWidth: 1.5,
    },
    pinCodeTextStyle: {
      color: _color.textPrimary,
      fontSize: _ms(14),
      fontFamily: _fonts.workSansMedium,
      includeFontPadding: false,
    },
    focusStickStyle: {
      backgroundColor: _color.primary,
    },
    focusedPinCodeContainerStyle: {
      borderWidth: 1.5,
      borderColor: _color.primary,
    },
    // text style
    text: {
      color: _color.black,
      fontSize: _ms(12),
      fontFamily: _fonts.workSansMedium,
    },
    resendContInVisible: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 0.5,
    },
    resendContVisible: {
      flexDirection: 'row',
      alignItems: 'center',
      opacity: 1,
    },
  });
};
