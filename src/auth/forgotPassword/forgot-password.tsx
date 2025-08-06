import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { OtpInputRef } from 'react-native-otp-entry';
import { FONTS } from '../../assets';
import { Formik } from 'formik';
import { logger, showToast, useCountDownTimer } from '../../utils';
import { OTPBox } from '../components';
import { SecondaryLoader } from '../../common/loaders';
import { ForgotPasswordSchema } from '../validations';
import { RootStackParamList } from '../../navigation/types/types';
import { COMMON_STYLES, isIOS, COLORS, MS, MVS, SCREENS } from '../../misc';
import { SafeAreaWrapper, PrimaryHeader, PrimaryButton } from '../../presentation/components';
import { RootState } from '../../redux';
import { useForgotPasswordAction } from './hooks';
import { useVerifyEmailAction, useVerifyPhoneAction } from '../signup/hooks';

const authFieldHeight = MS(36);

const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const otpRef = useRef<OtpInputRef>(null);

  const [currentStep, setCurrentStep] = useState<'emailOrPhone' | 'otp'>('emailOrPhone');
  const [localStateHandler, setLocalStateHandler] = useState({
    emailorPhone: '',
    otp: '',
    verificationType: '',
  });
  const { startTimer, timeLeft, resetTimer } = useCountDownTimer(60);

  const { userType } = useSelector((state: RootState) => state.userType);
  const { forgotPasswordUiState, forgotPassword } = useForgotPasswordAction();
  const { verifyEmailUiState, verifyEmailOtp } = useVerifyEmailAction();
  const { verifyPhoneUiState, verifyPhoneNumOtp } = useVerifyPhoneAction();

  // logger.info('forgotPasswordUiState -', JSON.stringify(forgotPasswordUiState, null, 1));
  // logger.info('verifyEmailUiState -', JSON.stringify(verifyEmailUiState, null, 1));
  // logger.info('verifyPhoneUiState -', JSON.stringify(verifyPhoneUiState, null, 1));

  // based on forgotPassword, storing identifier like email or password
  useEffect(() => {
    if (forgotPasswordUiState?.data && forgotPasswordUiState.data?.data?.identifier) {
      setLocalStateHandler(prev => ({ ...prev, verificationType: forgotPasswordUiState.data?.data?.identifier }));
    }
  }, [forgotPasswordUiState]);

  const _handleSubmitClick = async () => {
    resetTimer();
    const { success } = await forgotPassword({ input: localStateHandler.emailorPhone, userType: userType ?? '' });
    if (success) {
      startTimer();
      setCurrentStep('otp');
    }
  };

  const _handleVerifyOTPClick = async () => {
    if (localStateHandler.otp.length < 5) {
      return showToast({ text1: 'invalid otp', type: 'error' });
    }

    if (localStateHandler.verificationType === 'email') {
      const { success } = await verifyEmailOtp(localStateHandler.emailorPhone, localStateHandler.otp);
      logger.log('_handleVerifyOTPClick Success: ', success);
      otpRef?.current?.clear();
      if (success) {
        navigation.push(SCREENS.authStack, {
          screen: SCREENS.resetPassword,
          params: { input: localStateHandler.emailorPhone },
        });
      }
    } else if (localStateHandler.verificationType === 'phone') {
      const { success } = await verifyPhoneNumOtp(localStateHandler.emailorPhone, localStateHandler.otp);
      logger.log('_handleVerifyOTPClick Success: ', success);
      otpRef?.current?.clear();
      if (success) {
        navigation.push(SCREENS.authStack, {
          screen: SCREENS.resetPassword,
          params: { input: localStateHandler.emailorPhone },
        });
      }
    }
  };

  const _renderEmailOrPhoneInputCom = () => {
    return (
      <View style={styles.formCont}>
        <View>
          <Text style={styles.title}>Enter your phone number {'\n'}Or email address</Text>
        </View>

        <Formik initialValues={{ email: '' }} validationSchema={ForgotPasswordSchema} onSubmit={_handleSubmitClick}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
            return (
              <View style={styles.formCont}>
                <View>
                  <TextInput
                    placeholder="Email or Phone Number (with country code)"
                    placeholderTextColor={COLORS.textPrimary}
                    value={values.email}
                    onChangeText={text => {
                      handleChange('email')(text);
                      setLocalStateHandler(prev => ({ ...prev, emailorPhone: text }));
                    }}
                    onBlur={handleBlur('email')}
                    style={styles.emailInput}
                    autoCorrect={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
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
          <OTPBox
            verify=""
            otpInpHeight={authFieldHeight}
            handleOptInput={otp => setLocalStateHandler(prev => ({ ...prev, otp }))}
            timeLeft={timeLeft}
            otpRef={otpRef}
            resendFunction={_handleSubmitClick}
          />
        </View>

        {/* verify in button */}
        <PrimaryButton title="Verify" onPress={_handleVerifyOTPClick} />
      </View>
    );
  };

  const _renderLoader = () => {
    if (forgotPasswordUiState.isLoading || verifyEmailUiState.isLoading || verifyPhoneUiState.isLoading) {
      return <SecondaryLoader />;
    }
    return null;
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
          {_renderLoader()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const gapAndMargin = MVS(20);
const bdrWidth = 1.2;

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
