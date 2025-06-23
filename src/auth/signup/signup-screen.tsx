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
import React, {useState} from 'react';
import {Formik} from 'formik';
import {_icons, _fonts} from '../../assets';
import {_color, _styles, _ms, _mvs, _isIOS, _screens} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  TextButton,
  PrimaryButton,
} from '../../presentation/components';
import {OTPBox} from '../components';
import {_signupSchema} from '../validations';
import {privacyPolicyURL, termsOfServiceURL} from '../../constant';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types/types';
import {_hanldeOpenUrlFunc, _logger} from '../../utils';

const authFieldHeight = _ms(36);

const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [verificationStatus, setVerificationStatus] = useState({
    emailVerified: false,
    phoneVerified: false,
  });
  _logger.log('verificationStatus ->', verificationStatus);

  const initialValues = {
    fullName: '',
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    agreeToTerms: true,
  };

  const _handleEmailVerify = () => {
    setVerificationStatus(prev => ({...prev, emailVerified: true}));
  };

  const _handlePhoneVerify = () => {
    setVerificationStatus(prev => ({...prev, phoneVerified: true}));
  };

  const _handleSignup = (value: any) => {
    _logger.log('_handleSignup --: ', value);
  };

  const _handleSignInClick = () => {
    navigation.navigate(_screens.authStack, {
      screen: _screens.loginScreen,
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
          <Image source={_icons.google} style={_styles.size22} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBTN}>
          <Image source={_icons.facebook} style={_styles.size24} />
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
      <Formik
        initialValues={initialValues}
        validationSchema={_signupSchema}
        onSubmit={_handleSignup}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
          _logger.log('values ->', values);

          return (
            <View style={styles.formCont}>
              {/* full name */}
              <View>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor={_color.textPrimary}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  style={styles.fullNameInput}
                />
                {errors.fullName && touched.fullName && typeof errors.fullName === 'string' && (
                  <Text style={styles.errorString}>{errors.fullName}</Text>
                )}
              </View>

              {/* email */}
              <View style={styles.commonCont}>
                <View style={styles.verifyCont}>
                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={_color.textPrimary}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      style={styles.emailInput}
                    />
                    {verificationStatus.emailVerified && (
                      <Image
                        source={_icons.checkGreen}
                        style={_styles.size16}
                        resizeMode="contain"
                      />
                    )}
                  </View>

                  <TextButton
                    title="Verify"
                    textStyle={styles.verify}
                    onPress={_handleEmailVerify}
                    disabled={false}
                  />
                </View>
                {errors.email && touched.email && typeof errors.email === 'string' && (
                  <Text style={styles.errorString}>{errors.email}</Text>
                )}
                <View>
                  <OTPBox otpInpHeight={authFieldHeight} />
                </View>
              </View>

              {/* phone number */}
              <View style={styles.commonCont}>
                <View style={styles.sendOTPCont}>
                  <TouchableOpacity style={styles.countryCodeBTN}>
                    <Text>+1</Text>
                    <Image
                      source={_icons.angleLeftDark}
                      style={styles.downArrow}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="000 000 0000"
                      placeholderTextColor={_color.textPrimary}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      style={styles.emailInput}
                    />
                    {verificationStatus.phoneVerified && (
                      <Image
                        source={_icons.checkGreen}
                        style={_styles.size16}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <TextButton
                    title="Send OTP"
                    textStyle={styles.verify}
                    onPress={_handlePhoneVerify}
                    disabled={false}
                  />
                </View>
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  typeof errors.phoneNumber === 'string' && (
                    <Text style={styles.errorString}>{errors.phoneNumber}</Text>
                  )}
                <View>
                  <OTPBox otpInpHeight={authFieldHeight} />
                </View>
              </View>

              {/* signup button */}
              <PrimaryButton
                onPress={handleSubmit}
                title="Sign up"
                buttonStyle={true ? styles.SignupBTN : undefined}
                textStyle={true ? styles.SignupString : undefined}
              />

              {/* term of service - privacy policy */}
              <View style={styles.privacyPolicyCont}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setFieldValue('agreeToTerms', !values.agreeToTerms)}
                  style={styles.checkCont}>
                  {values.agreeToTerms && (
                    <Image source={_icons.check} style={_styles.size10} tintColor={_color.black} />
                  )}
                </TouchableOpacity>
                <View style={styles.privacyPolicyStringCont}>
                  <Text style={styles.termOfServiceString}>By signing up. you agree to the </Text>
                  <TouchableOpacity
                    onPress={() => {
                      _hanldeOpenUrlFunc(termsOfServiceURL);
                    }}>
                    <Text style={[styles.termOfServiceString, styles.blueTxt]}>
                      Terms of service{' '}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.termOfServiceString}>and </Text>
                  <TouchableOpacity onPress={() => _hanldeOpenUrlFunc(privacyPolicyURL)}>
                    <Text style={[styles.termOfServiceString, styles.blueTxt]}>
                      Privacy policy.
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    );
  };

  // main View
  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper style={styles.container}>
        <PrimaryHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.ScrollViewStyle}
          contentContainerStyle={styles.contentContainerStyle}>
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
          {_renderSocialButtons()}

          {/* sign in button */}
          {_renderSignInButton()}
        </ScrollView>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _ms(18),
    backgroundColor: _color.white,
  },
  ScrollViewStyle: {
    paddingTop: _mvs(16),
  },
  contentContainerStyle: {
    rowGap: _mvs(16),
  },
  title: {
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(20),
  },
  formCont: {
    marginTop: _mvs(20),
    rowGap: _mvs(16),
  },
  commonCont: {rowGap: _mvs(16)},
  fullNameInput: {
    padding: 0,
    paddingStart: _ms(12),
    height: authFieldHeight,
    borderWidth: 1.5,
    borderColor: _color.black,
    borderRadius: 8,
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
  },
  errorString: {
    marginStart: _ms(8),
    color: _color.red,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(10),
    includeFontPadding: false,
  },
  emailCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: authFieldHeight,
    borderWidth: 1.5,
    borderColor: _color.black,
    borderRadius: 8,
    paddingEnd: _ms(12),
    columnGap: _ms(8),
  },
  emailInput: {
    padding: 0,
    height: authFieldHeight,
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
    borderRadius: 8,
    flex: 1,
    paddingStart: _ms(12),
  },
  verifyCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: _ms(8),
  },
  verify: {
    color: _color.primary,
    fontSize: _ms(12),
  },
  sendOTPCont: {flexDirection: 'row', alignItems: 'center', columnGap: _ms(8)},
  countryCodeBTN: {
    borderWidth: 1.5,
    borderColor: _color.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: authFieldHeight,
    borderRadius: 8,
    minWidth: _ms(52),
  },
  countryCodeString: {
    fontSize: _ms(14),
    color: _color.blue,
    fontFamily: _fonts.workSansRegular,
  },
  downArrow: {
    ..._styles.size10,
    transform: [{rotate: '-90deg'}],
  },
  SignupBTN: {
    backgroundColor: _color.CFCFCF,
  },
  SignupString: {
    color: _color.black,
  },
  privacyPolicyCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: _ms(8),
  },
  privacyPolicyStringCont: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkCont: {
    backgroundColor: _color.white,
    width: _ms(20),
    height: _ms(20),
    borderRadius: _ms(20),
    borderWidth: 2,
    borderColor: _color.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termOfServiceString: {
    fontSize: _ms(12),
    color: _color.B4B4B4,
    fontFamily: _fonts.workSansMedium,
  },
  blueTxt: {
    color: _color.primary,
  },
  orCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: _ms(12),
    // backgroundColor: _color.yellow,
  },
  horizontalView: {
    height: 1,
    flex: 1,
    backgroundColor: _color.B4B4B4,
  },
  orString: {
    color: _color.textSecondary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansMedium,
  },
  socialBTN: {
    borderWidth: 1.5,
    borderColor: _color.CFCFCF,
    width: _ms(48),
    height: _ms(48),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInString: {
    color: _color.primary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansMedium,
    marginLeft: -6,
  },
});
