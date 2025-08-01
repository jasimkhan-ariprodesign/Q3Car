import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { FONTS, ICONS } from '../../assets';
import { useSetPasswordAction } from './hooks';
import { SecondaryLoader } from '../../common';
import { SetPasswordSchema } from '../validations/schemas';
import { COMMON_STYLES, isIOS, COLORS, MS, MVS, SCREENS } from '../../misc';
import { AuthStackParamList, RootStackParamList } from '../../navigation/types/types';
import { SafeAreaWrapper, PrimaryHeader, IconButton, PrimaryButton } from '../../presentation/components';

const authFieldHeight = MS(36);

const SetPassword = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<AuthStackParamList, 'SetPassword'>>();
  const { userType, phone } = route?.params || {};

  const [formData, setFormData] = useState({
    showPasswrod: true,
    showConfirmPassword: true,
  });

  const { setpasswordUiState, setPasswordFunc } = useSetPasswordAction();

  const _handleShowPassword = (keyName: string) => {
    if (keyName === 'password') {
      setFormData(prev => ({ ...prev, showPasswrod: !formData.showPasswrod }));
    }
    if (keyName === 'confirmPassword') {
      setFormData(prev => ({ ...prev, showConfirmPassword: !formData.showConfirmPassword }));
    }
  };
  // const { success } = await setPasswordFunc(phone || '', values?.password);

  const _handleRegister = async (values: any) => {
    const payload = {
      phone: phone || '',
      password: values?.password || '',
      userType: userType || '',
    };

    const { success } = await setPasswordFunc(payload);

    if (success) {
      if (userType === 'ServiceProvider') {
        // navigation.push(SCREENS.SPDrawerNavigator, {
        //   screen: SCREENS.SPDashboardScreen,
        // });
        navigation.replace(SCREENS.authStack, {
          screen: SCREENS.spLoginScreen,
        });
      } else {
        // navigation.push(SCREENS.drawerNavigator, {
        //   screen: SCREENS.dashboardScreen,
        // });
        navigation.replace(SCREENS.authStack, {
          screen: SCREENS.loginScreen,
        });
      }
    }
  };

  const _renderLoader = () => {
    if (setpasswordUiState.isLoading) {
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            keyboardShouldPersistTaps={'handled'}
          >
            {/* Title Section */}
            <View>
              <Text style={styles.title}>Set Password</Text>
              <Text style={styles.labelString}>Set Password</Text>
            </View>

            {/* Form Section */}
            <Formik
              initialValues={{ password: '', confirmPassword: '' }}
              validationSchema={SetPasswordSchema}
              onSubmit={_handleRegister}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.formCont}>
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
                        onPress={() => _handleShowPassword('password')}
                        disabled={false}
                      />
                    </View>
                    {errors.password && touched.password && typeof errors.password === 'string' && (
                      <Text style={styles.errorString}>{errors.password}</Text>
                    )}
                  </View>

                  {/* Confirm Password Input */}
                  <View>
                    <View style={styles.pwdCont}>
                      <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={COLORS.textPrimary}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        style={styles.pwdInput}
                        secureTextEntry={formData.showConfirmPassword}
                      />
                      <IconButton
                        icon={formData.showConfirmPassword ? ICONS.invisible : ICONS.visible}
                        iconStyle={COMMON_STYLES.size20}
                        onPress={() => _handleShowPassword('confirmPassword')}
                        disabled={false}
                      />
                    </View>
                    {errors.confirmPassword && touched.confirmPassword && typeof errors.confirmPassword === 'string' && (
                      <Text style={styles.errorString}>{errors.confirmPassword}</Text>
                    )}
                    {/* password suggestion string */}
                    <Text style={styles.pwdSuggestionString}>Atleast 1 number or a special character</Text>
                  </View>

                  {/* Register Button */}
                  <PrimaryButton title="Register" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          </ScrollView>

          {/* loader */}
          {_renderLoader()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SetPassword;

const gapAndMargin = MVS(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: { paddingHorizontal: MS(18) },
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: MS(20),
  },
  formCont: {
    rowGap: gapAndMargin,
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS.workSansMedium,
    fontSize: MS(20),
    textAlign: 'center',
  },
  labelString: {
    color: COLORS.textSecondary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    textAlign: 'center',
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
  errorString: {
    marginStart: MS(8),
    color: COLORS.red,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(10),
    includeFontPadding: false,
  },

  pwdSuggestionString: {
    color: COLORS.textDisabled,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    marginTop: 4,
    marginLeft: 4,
  },
});
