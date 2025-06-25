import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {_styles, _isIOS, _color, _ms, _mvs} from '../../misc';
import {
  SafeAreaWrapper,
  PrimaryHeader,
  IconButton,
  PrimaryButton,
} from '../../presentation/components';
import {_fonts, _icons} from '../../assets';
import {_setPasswordSchema} from '../validations/schemas';

const authFieldHeight = _ms(36);

const SetPassword = () => {
  const [formData, setFormData] = useState({
    showPasswrod: true,
    showConfirmPassword: true,
  });

  const _handleShowPassword = (keyName: string) => {
    if (keyName === 'password') {
      setFormData(prev => ({...prev, showPasswrod: !formData.showPasswrod}));
    }
    if (keyName === 'confirmPassword') {
      setFormData(prev => ({...prev, showConfirmPassword: !formData.showConfirmPassword}));
    }
  };

  const handleRegister = (values: any) => {
    // In a real application, you would send this to your backend
    Alert.alert('Success', `Password set: ${values.password}`);
    console.log('Form submitted:', values);
  };

  return (
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <PrimaryHeader containerStyle={styles.headerStyle} />
        <View style={_styles.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}
            keyboardShouldPersistTaps={'handled'}>
            {/* Title Section */}
            <View>
              <Text style={styles.title}>Set Password</Text>
              <Text style={styles.labelString}>Set Password</Text>
            </View>

            {/* Form Section */}
            <Formik
              initialValues={{password: '', confirmPassword: ''}}
              validationSchema={_setPasswordSchema}
              onSubmit={handleRegister}>
              {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                <View style={styles.formCont}>
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
                        placeholderTextColor={_color.textPrimary}
                        value={values.confirmPassword}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        style={styles.pwdInput}
                        secureTextEntry={formData.showConfirmPassword}
                      />
                      <IconButton
                        icon={formData.showConfirmPassword ? _icons.invisible : _icons.visible}
                        iconStyle={_styles.size20}
                        onPress={() => _handleShowPassword('confirmPassword')}
                        disabled={false}
                      />
                    </View>
                    {errors.confirmPassword &&
                      touched.confirmPassword &&
                      typeof errors.confirmPassword === 'string' && (
                        <Text style={styles.errorString}>{errors.confirmPassword}</Text>
                      )}
                    {/* password suggestion string */}
                    <Text style={styles.pwdSuggestionString}>
                      Atleast 1 number or a special character
                    </Text>
                  </View>

                  {/* Register Button */}
                  <PrimaryButton title="Register" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SetPassword;

const gapAndMargin = _mvs(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  headerStyle: {paddingHorizontal: _ms(18)},
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(20),
  },
  formCont: {
    rowGap: gapAndMargin,
  },
  title: {
    color: _color.black,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(20),
    textAlign: 'center',
  },
  labelString: {
    color: _color.textSecondary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansRegular,
    textAlign: 'center',
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
  errorString: {
    marginStart: _ms(8),
    color: _color.red,
    fontFamily: _fonts.workSansRegular,
    fontSize: _ms(10),
    includeFontPadding: false,
  },

  pwdSuggestionString: {
    color: _color.textDisabled,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
    marginTop: 4,
    marginLeft: 4,
  },
});
