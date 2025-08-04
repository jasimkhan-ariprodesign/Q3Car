import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FONTS } from '../../assets';
import { Formik } from 'formik';
import { logger } from '../../utils';
import { OTPBox } from '../components';
import { SecondaryLoader } from '../../common/loaders';
import { ForgotPasswordSchema } from '../validations';
import { RootStackParamList } from '../../navigation/types/types';
import { COMMON_STYLES, isIOS, COLORS, MS, MVS, SCREENS } from '../../misc';
import { SafeAreaWrapper, PrimaryHeader, PrimaryButton } from '../../presentation/components';

const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState<'emailOrPhone' | 'otp'>('emailOrPhone');
  const [otp, setOtp] = useState();

  logger.error(' focused -');

  const _handleSubmitClick = (value: any) => {
    logger.log('_handleSubmitClick --: ', value);
    setCurrentStep('otp');
  };

  const _handleVerifyOTPClick = () => {
    logger.log('_handleVerifyOTPClick OTP:', otp);
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.successScreen,
    });
  };

  const _renderEmailOrPhoneInputCom = () => {
    return (
      <View style={styles.formCont}>
        <View>
          <Text style={styles.title}>Enter your phone number {'\n'}Or email address</Text>
          <Text style={styles.labelTxt}>Email or Phone Number</Text>
        </View>

        <Formik initialValues={{ email: '' }} validationSchema={ForgotPasswordSchema} onSubmit={_handleSubmitClick}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            // logger.log('values ->', values);

            return (
              <View style={styles.formCont}>
                {/* email */}
                <View>
                  <TextInput
                    placeholder="Email or Phone Number"
                    placeholderTextColor={COLORS.textPrimary}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    style={styles.emailInput}
                    autoCorrect={false}
                  />
                  {errors.email && touched.email && typeof errors.email === 'string' && (
                    <Text style={styles.errorString}>{errors.email}</Text>
                  )}
                </View>

                {/* sign in button */}
                <PrimaryButton title="Submit" onPress={handleSubmit} />
              </View>
            );
          }}
        </Formik>
      </View>
    );
  };

  const _renderOTPInputCom = () => {
    return (
      <View style={styles.formCont}>
        <View>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.labelTxt}>Code has been send to ******70</Text>
        </View>

        <View style={styles.otpBoxCont}>
          <OTPBox otpInpHeight={authFieldHeight} />
        </View>

        {/* verify in button */}
        <PrimaryButton title="Verify" onPress={_handleVerifyOTPClick} />
      </View>
    );
  };

  // main com View
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
            {/* email Or Phone input && otp input com  */}
            {currentStep === 'emailOrPhone' ? _renderEmailOrPhoneInputCom() : _renderOTPInputCom()}
          </ScrollView>
          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const gapAndMargin = MVS(20);
const bdrWidth = 1.2;
const authFieldHeight = MS(36);

const styles = StyleSheet.create({
  headerStyle: { paddingHorizontal: MS(18) },
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: MS(18),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS.workSansMedium,
    fontSize: MS(18),
    textAlign: 'center',
  },
  labelTxt: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    textAlign: 'center',
  },
  formCont: {
    marginTop: MVS(20),
    rowGap: gapAndMargin,
  },
  emailInput: {
    padding: 0,
    paddingStart: MS(12),
    height: authFieldHeight,
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    borderRadius: 8,
    color: COLORS.black,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    includeFontPadding: false,
  },
  errorString: {
    marginStart: MS(8),
    color: COLORS.red,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(10),
    includeFontPadding: false,
  },
  otpBoxCont: { marginTop: gapAndMargin },
});
