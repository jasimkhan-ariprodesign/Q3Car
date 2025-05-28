import {Button, Image, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {_icons, _fonts} from '../../assets';
import {_color, _styles, _ms, _mvs} from '../../misc';
import {SafeAreaWrapper, PrimaryHeader, TextButton} from '../../presentation/components';
import OTPBox from '../components/otp-box';

const authFieldHeight = _ms(36);

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Full name is too short')
    .max(50, 'Full name is too long')
    .required('Full name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  countryCode: Yup.string().required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone number is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

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
    agreeToTerms: false,
  };

  // Usage
  const handleEmailVerify = () => {
    setVerificationStatus(prev => ({...prev, email: true}));
  };

  const handlePhoneVerify = () => {
    setVerificationStatus(prev => ({...prev, phone: true}));
  };

  const _handleSignup = (value: any) => {
    console.log('_handleSignup --: ', value);
  };
  return (
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
          validationSchema={SignupSchema}
          onSubmit={_handleSignup}>
          {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => {
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

                  <OTPBox otpInpHeight={authFieldHeight} />
                </View>

                <Button title="check" onPress={() => handleSubmit()} />
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaWrapper>
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
    margin: 1,
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
    margin: 1,
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
});
