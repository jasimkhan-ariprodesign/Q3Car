import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
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
import {_color, _styles, _ms, _mvs, _isIOS} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  TextButton,
  PrimaryButton,
} from '../../presentation/components';
import {OTPBox} from '../components';
import {_signupSchema} from '../validations';

const authFieldHeight = _ms(36);

const SignupScreen = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    emailVerified: false,
    phoneVerified: false,
  });

  const initialValues = {
    fullName: '',
    email: '',
    countryCode: '+1',
    phoneNumber: '',
    agreeToTerms: true,
  };

  const termsOfServiceURL = 'https://www.linkedin.com/in/jasim-khan-40a3aa195/';
  const privacyPolicyURL = 'https://www.linkedin.com/in/jasim-khan-40a3aa195/';

  // Usage
  const _handleEmailVerify = () => {
    setVerificationStatus(prev => ({...prev, email: true}));
  };

  const _handlePhoneVerify = () => {
    setVerificationStatus(prev => ({...prev, phone: true}));
  };

  const _hanldeOpenUrl = async (url: string) => {
    if (!url) return console.warn('---');

    try {
      const urlSupported = await Linking.canOpenURL(url);
      if (urlSupported) {
        await Linking.openURL(url);
        await Linking.openURL(url);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to open');
    }
  };

  const _handleSignup = (value: any) => {
    console.log('_handleSignup --: ', value);
  };
  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper style={styles.container}>
        <PrimaryHeader />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollViewStyle}>
          <View>
            <Text style={styles.title}>
              Hello!{'\n'}Signup to {'\n'}get started
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={_signupSchema}
            onSubmit={_handleSignup}>
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
              console.log('values ->', values);

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
                  <View>
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
                        <Image
                          source={_icons.checkGreen}
                          style={_styles.size16}
                          resizeMode="contain"
                        />
                      </View>

                      <TextButton title="Verify" textStyle={styles.verify} />
                    </View>
                    {errors.email && touched.email && typeof errors.email === 'string' && (
                      <Text style={styles.errorString}>{errors.email}</Text>
                    )}
                    <View>
                      <OTPBox otpInpHeight={authFieldHeight} />
                    </View>
                  </View>

                  {/* phone number */}
                  <View>
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
                        <Image
                          source={_icons.checkGreen}
                          style={_styles.size16}
                          resizeMode="contain"
                        />
                      </View>
                      <TextButton title="Send OTP" textStyle={styles.verify} />
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
                        <Image
                          source={_icons.check}
                          style={_styles.size10}
                          tintColor={_color.black}
                        />
                      )}
                    </TouchableOpacity>
                    <Text style={styles.termOfServiceString}>
                      By signing up. you agree to the{' '}
                      <Text
                        onPress={() => _hanldeOpenUrl(termsOfServiceURL)}
                        style={[styles.termOfServiceString, styles.blueTxt]}>
                        Terms of service
                      </Text>{' '}
                      and{' '}
                      <Text
                        onPress={() => _hanldeOpenUrl(privacyPolicyURL)}
                        style={[styles.termOfServiceString, styles.blueTxt]}>
                        Privacy policy.
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              );
            }}
          </Formik>
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
  title: {
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(20),
  },
  formCont: {
    marginTop: _mvs(20),
  },
  fullNameInput: {
    padding: 0,
    paddingStart: _ms(12),
    height: authFieldHeight,
    borderWidth: 1,
    borderColor: _color.black,
    // margin: 1,
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
    borderWidth: 1,
    borderColor: _color.black,
    // margin: 1,
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
    borderWidth: 1,
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
});
