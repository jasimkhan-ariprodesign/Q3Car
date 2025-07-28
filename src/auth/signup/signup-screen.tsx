import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { OTPBox } from '../components';
import { ICONS, FONTS } from '../../assets';
import { CustomerSignupSchema } from '../validations';
import { SecondaryLoader } from '../../common/loaders';
import { RootStackParamList } from '../../navigation/types/types';
import { UserSignupIntialValues } from './components/config';
import { privacyPolicyURL, termsOfServiceURL } from '../../constant';
import { COLORS, COMMON_STYLES, MS, MVS, isIOS, SCREENS } from '../../misc';
import { useCustomerSignupAction, useVerifyEmailAction, useVerifyPhoneAction } from './hooks';
import { _hanldeOpenUrlFunc, logger, appAlert, useCountDownTimer, showToast } from '../../utils';
import { SafeAreaWrapper, PrimaryHeader, TextButton, PrimaryButton, CountryCodePicker } from '../../presentation/components';
import { CustomerSignUpInitialEntity } from '../../utils/entities/auth/customer-signup-entity';

const authFieldHeight = MS(36);

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const formikRef = useRef<FormikProps<CustomerSignUpInitialEntity>>(null);
  const otpRef = useRef<any>(null);

  const [showOtpBox, setShowOtpBox] = useState({
    email: false,
    phone: false,
  });

  const [otpManager, setOtpManager] = useState({
    emailOtp: '',
    phoneOtp: '',
    email: '',
    phone: '',
    dial_code: '',
  });

  const { startTimer, timeLeft, resetTimer } = useCountDownTimer(60);

  const { signupUiState, registerCustomer } = useCustomerSignupAction();
  const { verifyEmailUiState, verifyEmail, verifyEmailOtp } = useVerifyEmailAction();
  const { verifyPhoneUiState, verifyPhoneNumber, verifyPhoneNumOtp } = useVerifyPhoneAction();
  // logger.log('verifyEmailUiState EMAIL -------<> ', JSON.stringify(verifyEmailUiState));
  // logger.log('verifyPhoneUiState PHONE -------<> ', JSON.stringify(verifyPhoneUiState, null, 4));
  // logger.log('signupUiState  -------<> ', JSON.stringify(signupUiState, null, 4));

  const _handleSendOtpToEmail = async (values: CustomerSignUpInitialEntity, validateField: any, setFieldTouched: any) => {
    await setFieldTouched('email', true);
    await validateField('email');
    const emailOnlySchema = CustomerSignupSchema.pick(['email']);
    const email = values.email;

    const isValidEmail = await emailOnlySchema.isValid({ email });

    if (isValidEmail) {
      await verifyEmail(values.email);
      startTimer();
      setShowOtpBox(prev => ({ ...prev, email: true }));
    }
  };

  const _handleVerifyEmailOtp = async (email: string) => {
    if (otpManager.emailOtp.length < 5) {
      return showToast({ text1: 'invalid otp', type: 'error' });
    }
    const { success } = await verifyEmailOtp(email, otpManager.emailOtp);
    setOtpManager(prev => ({ ...prev, emailOtp: '' }));
    otpRef.current?.clear();
    if (success) {
      setShowOtpBox(prev => ({ ...prev, email: false }));
      formikRef.current?.setFieldValue('isEmailVerified', true);
      resetTimer();
    }
  };

  const handleEmailOptInput = (otp: string) => {
    setOtpManager(prev => ({ ...prev, emailOtp: otp }));
  };

  const _handleSendOtpToPhone = async (values: CustomerSignUpInitialEntity, validateField: any, setFieldTouched: any) => {
    await setFieldTouched('phone', true);
    await validateField('phone');
    const phoneOnlySchema = CustomerSignupSchema.pick(['phone']);
    const phone = values.phone;

    const isValidPhone = await phoneOnlySchema.isValid({ phone });

    if (isValidPhone) {
      await verifyPhoneNumber(values.phone, values.countryCode);
      setShowOtpBox(prev => ({ ...prev, phone: true }));
      startTimer();
    }
  };

  const handlePhoneOptInput = (otp: string) => {
    setOtpManager(prev => ({ ...prev, phoneOtp: otp }));
  };

  const _handeVerifyPhoneOtp = async (phone: string) => {
    if (otpManager.phoneOtp.length < 5) {
      return showToast({ text1: 'invalid otp', type: 'error' });
    }
    const { success } = await verifyPhoneNumOtp(phone, otpManager.phoneOtp);
    setOtpManager(prev => ({ ...prev, phoneOtp: '' }));
    otpRef.current?.clear();
    if (success) {
      setShowOtpBox(prev => ({ ...prev, phone: false }));
      formikRef.current?.setFieldValue('isPhoneVerified', true);
      resetTimer();
    }
  };

  useEffect(() => {
    if (otpManager.emailOtp.length === 5) {
      _handleVerifyEmailOtp(otpManager.email);
    }
    if (otpManager.phoneOtp.length === 5) {
      _handeVerifyPhoneOtp(`${otpManager.dial_code}${otpManager.phone}`);
    }
  }, [otpManager]);

  const _handleSignup = async (value: CustomerSignUpInitialEntity) => {
    const { success } = await registerCustomer(value);

    if (success) {
      navigation.push(SCREENS.authStack, {
        screen: SCREENS.setPassword,
        params: {
          phone: `${otpManager.dial_code}${otpManager.phone}`,
        },
      });
    }
  };

  const _showCountryCodePicker = () => {
    bottomSheetModalRef.current?.present();
  };

  const _handleSignInClick = () => {
    navigation.navigate(SCREENS.authStack, {
      screen: SCREENS.loginScreen,
      params: {
        fromScreen: 'signup',
      },
    });
  };

  const _renderOrView = () => {
    return (
      <View style={styles.orCont}>
        <View style={styles.horizontalView} />
        <Text style={styles.orString}>or</Text>
        <View style={styles.horizontalView} />
      </View>
    );
  };

  const _renderSignInButton = () => {
    return (
      <View style={styles.orCont}>
        <Text style={styles.orString}>Already have an account?</Text>
        <TouchableOpacity onPress={_handleSignInClick}>
          <Text style={[styles.orString, styles.signInString]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderFormik = () => {
    return (
      <Formik
        innerRef={formikRef}
        initialValues={UserSignupIntialValues}
        validationSchema={CustomerSignupSchema}
        onSubmit={_handleSignup}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          validateField,
          setFieldTouched,
        }) => {
          const setDialCode = (dial_code: string) => {
            setFieldValue('countryCode', dial_code);
            setOtpManager(prev => ({ ...prev, dial_code: dial_code }));
            bottomSheetModalRef.current?.close();
          };

          return (
            <View style={styles.formCont}>
              {/* full name */}
              <View>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={COLORS.textPrimary}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  style={styles.fullNameInput}
                  autoCorrect={false}
                  autoCapitalize="words"
                />
                {errors.fullName && touched.fullName && typeof errors.fullName === 'string' && (
                  <Text style={styles.errorString}>{errors.fullName}</Text>
                )}
              </View>

              {/* email */}
              <View>
                <View style={styles.verifyCont}>
                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={COLORS.textPrimary}
                      value={values.email}
                      onChangeText={text => {
                        handleChange('email')(text);
                        setOtpManager(prev => ({ ...prev, email: text }));
                      }}
                      onBlur={handleBlur('email')}
                      style={styles.emailInput}
                      autoCorrect={false}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={!values.isEmailVerified}
                    />
                    {values.isEmailVerified && (
                      <Image source={ICONS.checkGreen} style={COMMON_STYLES.size16} resizeMode="contain" />
                    )}
                  </View>

                  <TextButton
                    title="Verify"
                    textStyle={styles.verify}
                    onPress={() => _handleSendOtpToEmail(values, validateField, setFieldTouched)}
                    disabled={false}
                  />
                </View>

                {touched.email && (
                  <>
                    {errors.email && typeof errors.email === 'string' && (
                      <Text style={styles.errorString}>{errors.email}</Text>
                    )}
                    {!errors.email && errors.isEmailVerified && typeof errors.isEmailVerified === 'string' && (
                      <Text style={styles.errorString}>{errors.isEmailVerified}</Text>
                    )}
                  </>
                )}

                {showOtpBox.email && (
                  <View style={styles.otpBoxCont}>
                    <OTPBox
                      otpInpHeight={authFieldHeight}
                      handleOptInput={handleEmailOptInput}
                      timeLeft={timeLeft}
                      resendFunction={() => _handleSendOtpToEmail(values, validateField, setFieldTouched)}
                      sendFunction={() => _handleVerifyEmailOtp(values.email)}
                      otpRef={otpRef}
                    />
                  </View>
                )}
              </View>

              {/* phone number */}
              <View>
                <View style={styles.sendOTPCont}>
                  <TouchableOpacity onPress={_showCountryCodePicker} style={styles.countryCodeBTN}>
                    <Text>{values.countryCode}</Text>
                    <Image source={ICONS.angleLeftDark} style={styles.downArrow} resizeMode="contain" />
                  </TouchableOpacity>

                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="000 000 0000"
                      placeholderTextColor={COLORS.textPrimary}
                      value={values.phone}
                      onChangeText={text => {
                        handleChange('phone')(text);
                        setOtpManager(prev => ({ ...prev, phone: text }));
                      }}
                      onBlur={handleBlur('phone')}
                      style={styles.emailInput}
                    />

                    {values.isPhoneVerified && (
                      <Image source={ICONS.checkGreen} style={COMMON_STYLES.size16} resizeMode="contain" />
                    )}
                  </View>

                  <TextButton
                    title="Send OTP"
                    textStyle={styles.verify}
                    onPress={() => _handleSendOtpToPhone(values, validateField, setFieldTouched)}
                    disabled={false}
                  />
                </View>

                {touched.phone && (
                  <>
                    {errors.phone && typeof errors.phone === 'string' && (
                      <Text style={styles.errorString}>{errors.phone}</Text>
                    )}
                    {!errors.phone && errors.isPhoneVerified && typeof errors.isPhoneVerified === 'string' && (
                      <Text style={styles.errorString}>{errors.isPhoneVerified}</Text>
                    )}
                  </>
                )}

                {showOtpBox.phone && (
                  <View style={styles.otpBoxCont}>
                    <OTPBox
                      otpInpHeight={authFieldHeight}
                      handleOptInput={handlePhoneOptInput}
                      timeLeft={timeLeft}
                      resendFunction={() => _handleSendOtpToPhone(values, validateField, setFieldTouched)}
                      sendFunction={() => _handeVerifyPhoneOtp(values.phone)}
                      otpRef={otpRef}
                    />
                  </View>
                )}
              </View>

              {/* signup button */}
              <PrimaryButton
                onPress={handleSubmit}
                title="Sign up"
                buttonStyle={true ? styles.SignupBTN : undefined}
                textStyle={true ? styles.SignupString : undefined}
              />

              {/* term of service - privacy policy */}
              <View>
                <View style={styles.privacyPolicyCont}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                    style={styles.checkCont}
                  >
                    {values.agreeToTerms && (
                      <Image source={ICONS.check} style={COMMON_STYLES.size10} tintColor={COLORS.black} />
                    )}
                  </TouchableOpacity>

                  <View style={styles.privacyPolicyStringCont}>
                    <Text style={styles.termOfServiceString}>By signing up. you agree to the </Text>
                    <TouchableOpacity
                      onPress={() => {
                        _hanldeOpenUrlFunc(termsOfServiceURL);
                      }}
                    >
                      <Text style={[styles.termOfServiceString, styles.blueTxt]}>Terms of service </Text>
                    </TouchableOpacity>

                    <Text style={styles.termOfServiceString}>and </Text>
                    <TouchableOpacity onPress={() => _hanldeOpenUrlFunc(privacyPolicyURL)}>
                      <Text style={[styles.termOfServiceString, styles.blueTxt]}>Privacy policy.</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {errors.agreeToTerms && typeof errors.agreeToTerms === 'string' && (
                  <Text style={styles.errorString}>{errors.agreeToTerms}</Text>
                )}
              </View>

              {/* country code picker */}
              <CountryCodePicker bottomSheetModalRef={bottomSheetModalRef} setDialCode={setDialCode} />
            </View>
          );
        }}
      </Formik>
    );
  };

  const _renderLoader = () => {
    if (signupUiState.isLoading || verifyEmailUiState.isLoading || verifyPhoneUiState.isLoading) {
      return <SecondaryLoader />;
    }
    return null;
  };

  // Main View
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <Text style={styles.title}>
                Hello!{'\n'}Signup to {'\n'}get started
              </Text>
            </View>

            {/* form/formik */}
            {_renderFormik()}

            {/* or */}
            {_renderOrView()}

            {/* sign in button */}
            {_renderSignInButton()}
          </ScrollView>

          {/* loader */}
          {_renderLoader()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const gapAndMargin = MVS(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: { paddingHorizontal: MS(18) },
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: MS(18),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(20),
  },
  formCont: {
    rowGap: gapAndMargin,
  },
  otpBoxCont: { marginTop: gapAndMargin },
  fullNameInput: {
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
  emailCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: authFieldHeight,
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingEnd: MS(12),
    columnGap: MS(8),
  },
  emailInput: {
    padding: 0,
    height: authFieldHeight,
    color: COLORS.black,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    includeFontPadding: false,
    borderRadius: 8,
    flex: 1,
    paddingStart: MS(12),
  },
  verifyCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),
  },
  verify: {
    color: COLORS.primary,
    fontSize: MS(12),
  },
  sendOTPCont: { flexDirection: 'row', alignItems: 'center', columnGap: MS(8) },
  countryCodeBTN: {
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: authFieldHeight,
    borderRadius: 8,
    minWidth: MS(56),
  },
  countryCodeString: {
    fontSize: MS(14),
    color: COLORS.blue,
    fontFamily: FONTS.workSansRegular,
  },
  downArrow: {
    ...COMMON_STYLES.size10,
    transform: [{ rotate: '-90deg' }],
  },
  SignupBTN: {
    backgroundColor: COLORS.CFCFCF,
  },
  SignupString: {
    color: COLORS.black,
  },
  privacyPolicyCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: MS(8),
  },
  privacyPolicyStringCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkCont: {
    backgroundColor: COLORS.white,
    width: MS(20),
    height: MS(20),
    borderRadius: MS(20),
    borderWidth: 2,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termOfServiceString: {
    fontSize: MS(12),
    color: COLORS.B4B4B4,
    fontFamily: FONTS.workSansMedium,
  },
  blueTxt: {
    color: COLORS.primary,
  },
  orCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: MS(12),
  },
  horizontalView: {
    height: 1,
    flex: 1,
    backgroundColor: COLORS.B4B4B4,
  },
  orString: {
    color: COLORS.textSecondary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
  },
  socialBTN: {
    borderWidth: bdrWidth,
    borderColor: COLORS.CFCFCF,
    width: MS(48),
    height: MS(48),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInString: {
    color: COLORS.primary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
    marginLeft: -6,
  },
});
