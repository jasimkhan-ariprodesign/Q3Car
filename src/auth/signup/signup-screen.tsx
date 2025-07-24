import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { ICONS, FONTS } from '../../assets';
import { COLORS, COMMON_STYLES, MS, MVS, isIOS, SCREENS } from '../../misc';
import { SafeAreaWrapper, PrimaryHeader, TextButton, PrimaryButton } from '../../presentation/components';
import { OTPBox } from '../components';
import { privacyPolicyURL, termsOfServiceURL } from '../../constant';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types/types';
import appAlert, { _hanldeOpenUrlFunc, logger, showToast } from '../../utils';
import { SecondaryLoader } from '../../common/loaders';
import { SignupSchema, UserSignupIntialValues } from './config';
import { useCustomerSignupAction, useVerifyEmailAction } from './hooks';
import { SignUpInitialValuesEntity } from './entities/user-signup-entity';
import ToastManager, { Toast } from 'toastify-react-native';

const authFieldHeight = MS(36);

const SignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [showOtpBox, setShowOtpBox] = useState({
    email: false,
    phone: false,
  });

  const { signupUiState, registerUser } = useCustomerSignupAction();
  const { verifyEmailUiState, verifyEmail } = useVerifyEmailAction();

  // logger.log('signupUiState -->', signupUiState);
  // logger.log('verifyEmailUiState -->', verifyEmailUiState);

  const _handleEmailVerify = async (values: SignUpInitialValuesEntity) => {
    const emailOnlySchema = SignupSchema.pick(['email']);
    const email = values.email;

    const isValidEmail = await emailOnlySchema.isValid({ email });

    if (isValidEmail) {
      await verifyEmail(values.email);
      setShowOtpBox(prev => ({ ...prev, email: true }));
    }
  };

  const _handlePhoneVerify = async (values: SignUpInitialValuesEntity) => {
    const phoneOnlySchema = SignupSchema.pick(['phone']);
    const phone = values.phone;

    const isValidPhone = await phoneOnlySchema.isValid({ phone });

    if (isValidPhone) {
      appAlert.alert('its working');
      // setShowOtpBox(prev => ({ ...prev, phone: true }));
    }
  };

  const _handleSignup = (value: SignUpInitialValuesEntity) => {
    // logger.log('_handleSignup --: ', value);
    // navigation.push(SCREENS.authStack, {
    //   screen: SCREENS.setPassword,
    // });
    registerUser(value);
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

  const _renderSocialButtons = () => {
    return (
      <View style={styles.orCont}>
        <TouchableOpacity style={styles.socialBTN}>
          <Image source={ICONS.google} style={COMMON_STYLES.size22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBTN}>
          <Image source={ICONS.facebook} style={COMMON_STYLES.size24} />
        </TouchableOpacity>
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
      <Formik initialValues={UserSignupIntialValues} validationSchema={SignupSchema} onSubmit={_handleSignup}>
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
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      style={styles.emailInput}
                      autoCorrect={false}
                    />
                    {values.isEmailVerified && (
                      <Image source={ICONS.checkGreen} style={COMMON_STYLES.size16} resizeMode="contain" />
                    )}
                  </View>

                  <TextButton
                    title="Verify"
                    textStyle={styles.verify}
                    onPress={() => _handleEmailVerify(values)}
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
                    <OTPBox otpInpHeight={authFieldHeight} />
                  </View>
                )}
              </View>

              {/* phone number */}
              <View>
                <View style={styles.sendOTPCont}>
                  <TouchableOpacity style={styles.countryCodeBTN}>
                    <Text>+1</Text>
                    <Image source={ICONS.angleLeftDark} style={styles.downArrow} resizeMode="contain" />
                  </TouchableOpacity>

                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="000 000 0000"
                      placeholderTextColor={COLORS.textPrimary}
                      value={values.phone}
                      onChangeText={handleChange('phone')}
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
                    onPress={() => _handlePhoneVerify(values)}
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
                    <OTPBox otpInpHeight={authFieldHeight} />
                  </View>
                )}
              </View>

              {/* signup button */}
              <PrimaryButton
                onPress={handleSubmit}
                // onPress={_handleSignup}
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
            </View>
          );
        }}
      </Formik>
    );
  };

  const _renderLoader = () => {
    if (signupUiState.isLoading || verifyEmailUiState.isLoading) {
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

            {/* social buttons */}
            {/* {_renderSocialButtons()} */}

            {/* sign in button */}
            {_renderSignInButton()}

            <Button
              title="hello"
              onPress={() => {
                showToast({ text1: 'check', text2: 'egehejekk' });
                // Toast.show({
                //   type: 'success',
                //   text1: 'Custom Toast',
                //   text2: 'With many options',
                //   position: 'bottom',
                //   style: {backgroundColor: 'red'},
                //   visibilityTime: 5000,
                //   autoHide: true,
                //   backgroundColor: '#333',
                //   textColor: '#fff',
                //   iconColor: '#4CAF50',
                //   iconSize: 14,
                //   progressBarColor: '#4CAF50',
                //   theme: 'dark',
                //   // Custom close icon options
                //   closeIcon: 'times-circle',
                //   closeIconFamily: 'FontAwesome',
                //   closeIconSize: 20,
                //   closeIconColor: '#fff',
                //   showProgressBar: false
                // });
              }}
            />
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
    minWidth: MS(52),
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
