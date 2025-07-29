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
import React, { useEffect, useRef, useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { OTPBox } from '../components';
import { ICONS, FONTS } from '../../assets';
import { SPSignupSchema } from '../validations';
import { SecondaryLoader } from '../../common/loaders';
import { CameraOrGalleryPopup } from '../../common';
import { RootStackParamList } from '../../navigation/types/types';
import { SPSignupInitialValues } from '../login/components/config';
import { useVerifyEmailAction, useVerifyPhoneAction } from './hooks';
import { privacyPolicyURL, termsOfServiceURL } from '../../constant';
import { COLORS, COMMON_STYLES, MS, MVS, isIOS, SCREENS } from '../../misc';
import { SPSignUpInitialEntity } from '../../utils/entities/auth/sp-signup-entity';
import { _hanldeOpenUrlFunc, logger, showToast, useCountDownTimer } from '../../utils';
import { useImagePicker, useServiceProviderSignupAction } from './hooks/serviceProvider';
import { useCloudinaryUpload } from '../../utils/cloudinary/upload-image-to-cloudinary';
import { SafeAreaWrapper, PrimaryHeader, TextButton, PrimaryButton, CountryCodePicker } from '../../presentation/components';

const authFieldHeight = MS(36);

const SPSignupScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const otpRef = useRef<any>(null);
  const formikRef = useRef<FormikProps<SPSignUpInitialEntity>>(null);

  const { startTimer, timeLeft, resetTimer } = useCountDownTimer(60);

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

  const [activeImageField, setActiveImageField] = useState<'driverLicenseImage' | 'insuranceImage' | null>(null);

  const { serviceProviderSignupUiState, registerServiceProvider } = useServiceProviderSignupAction();
  const { verifyEmailUiState, verifyEmail, verifyEmailOtp } = useVerifyEmailAction();
  const { verifyPhoneUiState, verifyPhoneNumber, verifyPhoneNumOtp } = useVerifyPhoneAction();

  const { pickImage } = useImagePicker();
  const { uploadUiState, uploadToCloudinary } = useCloudinaryUpload();

  const _handleUploadClick = (fieldName?: 'driverLicenseImage' | 'insuranceImage') => {
    if (fieldName) {
      return setActiveImageField(fieldName);
    }
    setActiveImageField(null);
  };

  const _handleUploadPictures = async (type: 'Camera' | 'Gallery') => {
    try {
      const uri = await pickImage(type);
      if (uri) {
        const { success, url } = await uploadToCloudinary({ uri: uri });
        if (success && url) {
          activeImageField && formikRef.current?.setFieldValue(activeImageField, url);
        }
      }
    } catch (error) {
      logger.log('handleProfileSelect Error', error);
    } finally {
      _handleUploadClick();
    }
  };

  const _handleSendOtpToEmail = async (values: SPSignUpInitialEntity, validateField: any, setFieldTouched: any) => {
    await setFieldTouched('email', true);
    await validateField('email');
    const emailOnlySchema = SPSignupSchema.pick(['email']);
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

  const _showCountryCodePicker = () => {
    bottomSheetModalRef.current?.present();
  };

  const handlePhoneOptInput = (otp: string) => {
    setOtpManager(prev => ({ ...prev, phoneOtp: otp }));
  };

  const _handleSendOtpToPhone = async (values: SPSignUpInitialEntity, validateField: any, setFieldTouched: any) => {
    await setFieldTouched('phone', true);
    await validateField('phone');
    const phoneOnlySchema = SPSignupSchema.pick(['phone']);
    const phone = values.phone;

    const isValidPhone = await phoneOnlySchema.isValid({ phone });

    if (isValidPhone) {
      await verifyPhoneNumber(values.phone, values.countryCode);
      setShowOtpBox(prev => ({ ...prev, phone: true }));
      startTimer();
    }
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

  const _handleSignup = async (values: SPSignUpInitialEntity) => {
    const { success } = await registerServiceProvider(values);

    if (success) {
      navigation.push(SCREENS.authStack, {
        screen: SCREENS.setPassword,
        params: {
          userType: 'service provider',
          phone: `${otpManager.dial_code}${otpManager.phone}`,
        },
      });
    }
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
        initialValues={SPSignupInitialValues}
        validationSchema={SPSignupSchema}
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
                    disabled={values.isEmailVerified}
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
                    <Text style={styles.countryCodeString}>{values.countryCode}</Text>
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
                      editable={!values.isPhoneVerified}
                    />
                    {values.isPhoneVerified && (
                      <Image source={ICONS.checkGreen} style={COMMON_STYLES.size16} resizeMode="contain" />
                    )}
                  </View>

                  <TextButton
                    title="Send OTP"
                    textStyle={styles.verify}
                    onPress={() => _handleSendOtpToPhone(values, validateField, setFieldTouched)}
                    disabled={values.isPhoneVerified}
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

              {/* driver licence input */}
              <View>
                <TextInput
                  placeholder="Driver licence"
                  placeholderTextColor={COLORS.textPrimary}
                  value={values.driverLicense}
                  onChangeText={handleChange('driverLicense')}
                  onBlur={handleBlur('driverLicense')}
                  style={styles.fullNameInput}
                  autoCorrect={false}
                />
                {errors.driverLicense && touched.driverLicense && typeof errors.driverLicense === 'string' && (
                  <Text style={styles.errorString}>{errors.driverLicense}</Text>
                )}
              </View>

              {/* driver licence picture */}
              <View>
                <View style={styles.sendOTPCont}>
                  <View style={styles.pictureContView}>
                    {values.driverLicenseImage ? (
                      <Image source={{ uri: values.driverLicenseImage }} style={styles.pictureImage} resizeMode="cover" />
                    ) : (
                      <Text style={[styles.countryCodeString, { marginLeft: MS(12) }]}>Picture of Driver's License</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => _handleUploadClick('driverLicenseImage')} style={styles.countryCodeBTN}>
                    <Text style={styles.countryCodeString}>Upload</Text>
                  </TouchableOpacity>
                </View>
                {errors.driverLicenseImage &&
                  touched.driverLicenseImage &&
                  typeof errors.driverLicenseImage === 'string' && (
                    <Text style={styles.errorString}>{errors.driverLicenseImage}</Text>
                  )}
              </View>

              {/* insurance input */}
              <View>
                <TextInput
                  placeholder="Insurance"
                  placeholderTextColor={COLORS.textPrimary}
                  value={values.insuranceNumber}
                  onChangeText={handleChange('insuranceNumber')}
                  onBlur={handleBlur('insuranceNumber')}
                  style={styles.fullNameInput}
                  autoCorrect={false}
                />
                {errors.insuranceNumber && touched.insuranceNumber && typeof errors.insuranceNumber === 'string' && (
                  <Text style={styles.errorString}>{errors.insuranceNumber}</Text>
                )}
              </View>

              {/* insurance picture */}
              <View>
                <View style={styles.sendOTPCont}>
                  <View style={styles.pictureContView}>
                    {values.insuranceImage ? (
                      <Image source={{ uri: values.insuranceImage }} style={styles.pictureImage} resizeMode="cover" />
                    ) : (
                      <Text style={[styles.countryCodeString, { marginLeft: MS(12) }]}>Picture of proof of insurance</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => _handleUploadClick('insuranceImage')} style={styles.countryCodeBTN}>
                    <Text style={styles.countryCodeString}>Upload</Text>
                  </TouchableOpacity>
                </View>
                {errors.insuranceImage && touched.insuranceImage && typeof errors.insuranceImage === 'string' && (
                  <Text style={styles.errorString}>{errors.insuranceImage}</Text>
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

              <CountryCodePicker bottomSheetModalRef={bottomSheetModalRef} setDialCode={setDialCode} />
            </View>
          );
        }}
      </Formik>
    );
  };

  const _renderCameraOrGalleryPopup = () => {
    return (
      <>
        <CameraOrGalleryPopup closePopupFunc={_handleUploadClick} onSelectImageType={_handleUploadPictures} />
      </>
    );
  };

  const _renderLoader = () => {
    if (
      serviceProviderSignupUiState.isLoading ||
      verifyEmailUiState.isLoading ||
      verifyPhoneUiState.isLoading ||
      uploadUiState.isLoading
    ) {
      return <SecondaryLoader />;
    }
    return null;
  };

  // main View
  return (
    <KeyboardAvoidingView
      style={[COMMON_STYLES.flex]}
      behavior={isIOS() ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ ios: MVS(8) })}
    >
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

          {/* Camera Gallery Popup  */}
          {activeImageField && _renderCameraOrGalleryPopup()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPSignupScreen;

const gapAndMargin = MVS(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: { paddingHorizontal: MS(18) },
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
    minWidth: MS(60),
  },
  countryCodeString: {
    fontSize: MS(12),
    color: COLORS.textSecondary,
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
