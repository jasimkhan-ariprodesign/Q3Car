import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {_fonts, _icons} from '../../assets';
import {_ms, _color, _mvs, _isIOS, _styles, _screens} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  TextButton,
  IconButton,
  PrimaryButton,
} from '../../presentation/components';
import {Formik} from 'formik';
import {_logger} from '../../utils';
import {_loginSchema} from '../validations/schemas';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthStackParamList, RootStackParamList} from '../../navigation/types/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {SecondaryLoader} from '../../common/loaders';

const authFieldHeight = _ms(36);
// CREATE SP LOGIN SEPARATE BECAUSE DESIGN IS DIFFERENT IN FIGMA BUT KEPPING SAME FOR NOW..
const SPLoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'LoginScreen'>>();
  const {fromScreen} = route?.params || {};

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

  const _handleSignUpClick = () => {
    if (fromScreen && fromScreen === 'signup') {
      navigation.goBack();
    } else {
      navigation.push(_screens.authStack, {
        screen: _screens.spSignupScreen,
      });
    }
  };

  const _handleForgotPasswordClick = () => {
    navigation.push(_screens.authStack, {
      screen: _screens.forgotPassword,
    });
  };

  const _handleSignIn = (value: any) => {
    _logger.log('_handleSignup --: ', value);
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

  const _renderSignUpButton = () => {
    return (
      <View style={styles.orCont}>
        <Text style={styles.orString}>Don't have an account?</Text>
        <TouchableOpacity onPress={_handleSignUpClick}>
          <Text style={[styles.orString, styles.signInString]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderFormik = () => {
    return (
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

              {/* forgot password button */}
              <View style={styles.forgotPWDBTN}>
                <TextButton
                  title="Forgot Password?"
                  textStyle={styles.forgotPasswordString}
                  onPress={_handleForgotPasswordClick}
                  disabled={false}
                />
              </View>

              {/* sign in button */}
              <PrimaryButton title="Sign in" onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    );
  };

  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={_styles.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <View>
              <Text style={styles.title}>
                Hello!{'\n'}Sign in to{'\n'}get started
              </Text>
            </View>

            {/* form/formik */}
            {_renderFormik()}

            {/* or */}
            {_renderOrView()}

            {/* sign up button */}
            {_renderSignUpButton()}
          </ScrollView>

          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPLoginScreen;
const gapAndMargin = _mvs(20);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: {paddingHorizontal: _ms(18)},
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(18),
  },
  title: {
    color: _color.black,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(20),
  },
  formCont: {
    marginTop: _mvs(20),
    rowGap: _mvs(12),
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
    // marginTop: -gapAndMargin / 2,
  },
  forgotPasswordString: {
    color: _color.red,
    fontSize: _ms(10.5),
    includeFontPadding: false,
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
  signInString: {
    color: _color.primary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansMedium,
    marginLeft: -6,
  },
});
