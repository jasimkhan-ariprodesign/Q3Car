import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {_fonts, _icons} from '../../assets';
import {_ms, _color, _mvs, _isIOS, _styles} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  TextButton,
  IconButton,
} from '../../presentation/components';
import {Formik} from 'formik';
import {_logger} from '../../utils';
import {_loginSchema} from '../validations/schemas';

const authFieldHeight = _ms(36);

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    showPasswrod: true,
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const _handleShowPassword = () => {
    setFormData(prev => ({...prev, showPasswrod: !formData.showPasswrod}));
  };

  const _handleSignIn = (value: any) => {
    _logger.log('_handleSignup --: ', value);
  };

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
              Hello!{'\n'}Sign in to{'\n'}get started
            </Text>
          </View>

          <Formik
            initialValues={initialValues}
            validationSchema={_loginSchema}
            onSubmit={_handleSignIn}>
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => {
              _logger.log('values ->', values);

              return (
                <View style={styles.formCont}>
                  {/* email */}
                  <View>
                    <TextInput
                      placeholder="Email or Phone Number"
                      placeholderTextColor={_color.textPrimary}
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

                  {/* passwrod */}
                  <View>
                    <View style={styles.pwdCont}>
                      <TextInput
                        placeholder="Enter Your Password"
                        placeholderTextColor={_color.textPrimary}
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        style={styles.pwdInput}
                        secureTextEntry={formData.showPasswrod}
                      />
                      <IconButton
                        icon={formData.showPasswrod ? _icons.invisible : _icons.visible}
                        iconStyle={_styles.size20}
                        onPress={_handleShowPassword}
                        disabled={false}
                      />
                    </View>
                    {errors.password && touched.password && typeof errors.password === 'string' && (
                      <Text style={styles.errorString}>{errors.password}</Text>
                    )}
                  </View>

                  <View style={styles.forgotPWDBTN}>
                    <TextButton title="Forgot Password?" textStyle={styles.forgotPasswordString} />
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

export default LoginScreen;
const gapAndMargin = _mvs(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _ms(18),
    backgroundColor: _color.white,
  },
  ScrollViewStyle: {
    paddingTop: _mvs(16),
  },
  contentContainerStyle: {
    rowGap: gapAndMargin,
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
  emailInput: {
    padding: 0,
    paddingStart: _ms(12),
    height: authFieldHeight,
    borderWidth: bdrWidth,
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
  pwdCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: _ms(8),

    height: authFieldHeight,
    borderWidth: bdrWidth,
    borderColor: _color.black,
    paddingEnd: _ms(12),
    borderRadius: 8,
  },
  pwdInput: {
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
  forgotPWDBTN: {
    alignItems: 'flex-end',
    marginTop: -gapAndMargin / 2,
  },
  forgotPasswordString: {
    color: _color.red,
    fontSize: _ms(12),
  },
});
