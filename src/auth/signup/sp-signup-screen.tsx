import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import {ICONS, FONTS, IMAGES} from '../../assets';
import {COLORS, COMMON_STYLES, MS, MVS, isIOS, SCREENS} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  TextButton,
  PrimaryButton,
} from '../../presentation/components';
import {OTPBox} from '../components';
import {_signupSchema} from '../validations';
import {privacyPolicyURL, termsOfServiceURL} from '../../constant';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types/types';
import {_hanldeOpenUrlFunc, logger} from '../../utils';
import {SecondaryLoader} from '../../common/loaders';

const authFieldHeight = MS(36);

const SPSignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [verificationStatus, setVerificationStatus] = useState({
    emailVerified: false,
    phoneVerified: false,
  });
  logger.log('verificationStatus ->', verificationStatus);

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

  const _handleSignup = () => {
    // const _handleSignup = (value: any) => {
    // _logger.log('_handleSignup --: ', value);
    navigation.push(SCREENS.authStack, {
      screen: SCREENS.setPassword,
      params: {
        userType: 'service provider',
      },
    });
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
        initialValues={initialValues}
        validationSchema={_signupSchema}
        onSubmit={_handleSignup}>
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
          // logger.log('values ->', values);

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
                    {verificationStatus.emailVerified && (
                      <Image
                        source={ICONS.checkGreen}
                        style={COMMON_STYLES.size16}
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
                <View style={styles.otpBoxCont}>
                  <OTPBox otpInpHeight={authFieldHeight} />
                </View>
              </View>

              {/* phone number */}
              <View>
                <View style={styles.sendOTPCont}>
                  <TouchableOpacity style={styles.countryCodeBTN}>
                    <Text style={styles.countryCodeString}>+1</Text>
                    <Image
                      source={ICONS.angleLeftDark}
                      style={styles.downArrow}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                  <View style={styles.emailCont}>
                    <TextInput
                      placeholder="000 000 0000"
                      placeholderTextColor={COLORS.textPrimary}
                      value={values.phoneNumber}
                      onChangeText={handleChange('phoneNumber')}
                      onBlur={handleBlur('phoneNumber')}
                      style={styles.emailInput}
                    />
                    {verificationStatus.phoneVerified && (
                      <Image
                        source={ICONS.checkGreen}
                        style={COMMON_STYLES.size16}
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
                <View style={styles.otpBoxCont}>
                  <OTPBox otpInpHeight={authFieldHeight} />
                </View>
              </View>

              {/* driver licence input */}
              <View>
                <TextInput
                  placeholder="Driver licence"
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

              {/* driver licence picture */}
              <View style={styles.sendOTPCont}>
                <View style={styles.pictureContView}>
                  {/* <Image
                    source={_images.spWelcomeScreen}
                    style={styles.pictureImage}
                    resizeMode="cover"
                  /> */}
                  <Text style={[styles.countryCodeString, {marginLeft: MS(12)}]}>
                    Picture of Driver's License
                  </Text>
                </View>
                <TouchableOpacity style={styles.countryCodeBTN}>
                  <Text style={styles.countryCodeString}>Upload</Text>
                </TouchableOpacity>
              </View>

              {/* insurance input */}
              <View>
                <TextInput
                  placeholder="Insurance"
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

              {/* insurance picture */}
              <View style={styles.sendOTPCont}>
                <View style={styles.pictureContView}>
                  {/* <Image
                    source={_images.spWelcomeScreen}
                    style={styles.pictureImage}
                    resizeMode="cover"
                  /> */}
                  <Text style={[styles.countryCodeString, {marginLeft: MS(12)}]}>
                    Picture of proof of insurance
                  </Text>
                </View>
                <TouchableOpacity style={styles.countryCodeBTN}>
                  <Text style={styles.countryCodeString}>Upload</Text>
                </TouchableOpacity>
              </View>

              {/* signup button */}
              <PrimaryButton
                // onPress={handleSubmit}
                onPress={_handleSignup}
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
                    <Image
                      source={ICONS.check}
                      style={COMMON_STYLES.size10}
                      tintColor={COLORS.black}
                    />
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
    <KeyboardAvoidingView
      style={[COMMON_STYLES.flex]}
      behavior={isIOS() ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: MVS(8)})}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
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

            {/* sign in button */}
            {_renderSignInButton()}
          </ScrollView>
          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPSignupScreen;

const gapAndMargin = MVS(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: {paddingHorizontal: MS(18)},
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: MS(18),
    paddingBottom: MVS(20),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(20),
  },
  formCont: {
    rowGap: gapAndMargin,
  },
  otpBoxCont: {marginTop: gapAndMargin},
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
  sendOTPCont: {flexDirection: 'row', alignItems: 'center', columnGap: MS(8)},
  countryCodeBTN: {
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: authFieldHeight,
    borderRadius: 8,
    minWidth: MS(60),
  },
  countryCodeString: {
    fontSize: MS(12),
    color: COLORS.textSecondary,
    fontFamily: FONTS.workSansRegular,
  },
  downArrow: {
    ...COMMON_STYLES.size10,
    transform: [{rotate: '-90deg'}],
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
  // driver licence picture view
  pictureContView: {
    flex: 1,
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    minHeight: authFieldHeight,
    maxHeight: authFieldHeight * 3,
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'scroll',
  },
  pictureImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
