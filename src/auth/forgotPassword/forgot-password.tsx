import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {COMMON_STYLES, _isIOS, COLORS, _ms, _mvs, SCREENS} from '../../misc';
import {SafeAreaWrapper, PrimaryHeader, PrimaryButton} from '../../presentation/components';
import {_fonts} from '../../assets';
import {Formik} from 'formik';
import {_forgotPasswordSchema} from '../validations/schemas';
import {_logger} from '../../utils';
import {OTPBox} from '../components';
import {SecondaryLoader} from '../../common/loaders';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types/types';
import {StackNavigationProp} from '@react-navigation/stack';

const ForgotPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [currentStep, setCurrentStep] = useState<'emailOrPhone' | 'otp'>('emailOrPhone');
  const [otp, setOtp] = useState();

  const _handleSubmitClick = (value: any) => {
    _logger.log('_handleSubmitClick --: ', value);
    setCurrentStep('otp');
  };

  const _handleVerifyOTPClick = () => {
    _logger.log('_handleVerifyOTPClick OTP:', otp);
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

        <Formik
          initialValues={{email: ''}}
          validationSchema={_forgotPasswordSchema}
          onSubmit={_handleSubmitClick}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
            _logger.log('values ->', values);

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
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
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

const gapAndMargin = _mvs(20);
const bdrWidth = 1.2;
const authFieldHeight = _ms(36);

const styles = StyleSheet.create({
  headerStyle: {paddingHorizontal: _ms(18)},
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(18),
  },
  title: {
    color: COLORS.black,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(18),
    textAlign: 'center',
  },
  labelTxt: {
    color: COLORS.textSecondary,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    textAlign: 'center',
  },
  formCont: {
    marginTop: _mvs(20),
    rowGap: gapAndMargin,
  },
  emailInput: {
    padding: 0,
    paddingStart: _ms(12),
    height: authFieldHeight,
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    borderRadius: 8,
    color: COLORS.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
  },
  errorString: {
    marginStart: _ms(8),
    color: COLORS.red,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(10),
    includeFontPadding: false,
  },
  otpBoxCont: {marginTop: gapAndMargin},
});
