import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import { FONTS, ICONS } from '../../assets';
import { LoginSchema } from '../validations';
import { SecondaryLoader } from '../../common/loaders';
import { logger, resetNestedNavigation } from '../../utils';
import { MS, COLORS, MVS, isIOS, COMMON_STYLES, SCREENS } from '../../misc';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types/types';
import { SafeAreaWrapper, PrimaryHeader, TextButton, IconButton, PrimaryButton } from '../../presentation/components';
import { useLoginAction } from './hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

const authFieldHeight = MS(36);

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'LoginScreen'>>();
  const { fromScreen } = route?.params || {};

  const [formData, setFormData] = useState({
    showPasswrod: true,
  });

  const { userType } = useSelector((state: RootState) => state.userType);

  const initialValues = {
    email: '',
    password: '',
  };

  const { loginUiState, loginUser } = useLoginAction();
  logger.log('loginUiState: ', loginUiState);
  logger.log('userType: ', userType);

  const _handleSignIn = async (value: any) => {
    const phoneOrEmail = value.email;
    const password = value?.password;

    const { success } = await loginUser({ phoneOrEmail, password, userType: userType ?? '' });

    if (success) {
      Keyboard.dismiss();
      resetNestedNavigation({
        navigation,
        parentRouteName: SCREENS.drawerNavigator,
        targetRouteName: SCREENS.dashboardScreen,
      });
    }
  };

  const _handleShowPassword = () => {
    setFormData(prev => ({ ...prev, showPasswrod: !formData.showPasswrod }));
  };

  const _handleSignUpClick = () => {
    if (fromScreen && fromScreen === 'signup') {
      navigation.goBack();
    } else {
      navigation.push(SCREENS.authStack, {
        screen: SCREENS.signupScreen,
      });
    }
  };

  const _handleForgotPasswordClick = () => {
    navigation.push(SCREENS.authStack, {
      screen: SCREENS.forgotPassword,
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
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={_handleSignIn}>
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {
          return (
            <View style={styles.formCont}>
              {/* email */}
              <View>
                <TextInput
                  placeholder="Email or Phone Number (with country code)"
                  placeholderTextColor={COLORS.textPrimary}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  style={styles.emailInput}
                  autoCorrect={false}
                  autoCapitalize="none"
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
                    placeholderTextColor={COLORS.textPrimary}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    style={styles.pwdInput}
                    secureTextEntry={formData.showPasswrod}
                  />
                  <IconButton
                    icon={formData.showPasswrod ? ICONS.invisible : ICONS.visible}
                    iconStyle={COMMON_STYLES.size20}
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

  const _renderLoader = () => {
    if (loginUiState.isLoading) {
      return <SecondaryLoader />;
    }
    return null;
  };

  // main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={COMMON_STYLES.flex}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
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
          {_renderLoader()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
const gapAndMargin = MVS(20);
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
    marginTop: MVS(20),
    rowGap: MVS(12),
  },
  emailInput: {
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
  pwdCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),

    height: authFieldHeight,
    borderWidth: bdrWidth,
    borderColor: COLORS.black,
    paddingEnd: MS(12),
    borderRadius: 8,
  },
  pwdInput: {
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
  forgotPWDBTN: {
    alignItems: 'flex-end',
  },
  forgotPasswordString: {
    color: COLORS.red,
    fontSize: MS(10.5),
    includeFontPadding: false,
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
  signInString: {
    color: COLORS.primary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
    marginLeft: -6,
  },
});
