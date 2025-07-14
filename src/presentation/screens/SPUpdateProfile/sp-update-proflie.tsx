import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {_isIOS} from '../../../misc/platform';
import {SafeAreaWrapper, TextButton} from '../../components';
import {COLORS, COMMON_STYLES, isIOS, MS, MVS} from '../../../misc';
import {FONTS} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';

export const _signupSchema = Yup.object().shape({
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

const SPUpdateProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleCancelClick = () => {
    navigation?.goBack();
  };

  const _renderHeader = () => {
    return (
      <View style={styles.haderCon}>
        <TextButton
          title="Cancel"
          textStyle={styles.cancelString}
          onPress={_handleCancelClick}
          disabled={false}
        />
        <TextButton title="Done" textStyle={styles.doneStringDisabledStyle} />
      </View>
    );
  };

  const _renderCont = () => {
    return (
      <>
        <Formik
          initialValues={{
            profileAvatar: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            birthday: '',
          }}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formCont}>
              {/* profile & name  */}

              <View style={styles.profileAndNameCont}>
                <View>
                  <View style={styles.profilePicCont}>
                    <Image
                      source={{
                        uri: 'https://i.pinimg.com/736x/b8/99/00/b8990034ff80c63eb42d27cdff0f7f24.jpg',
                      }}
                      style={styles.profilePic}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.editPhotoString}>Edit Photo</Text>
                </View>

                <View style={styles.firstAndLastNameCont}>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.firstNameInput}
                  />
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.firstNameInput}
                  />
                </View>
              </View>

              {/* horizontal line */}

              <View style={styles.horiLine} />

              {/* all other details */}
              <View>
                <View style={styles.commonView}>
                  <Text>Phone number</Text>
                  <TextInput
                    placeholder="584-490-9153"
                    placeholderTextColor={COLORS.textDisabled}
                    // style={styles.firstNameInput}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </>
    );
  };

  //   main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        {/* back & done cont */}
        {_renderHeader()}

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <>
            {/* content */}
            {_renderCont()}
          </>
        </ScrollView>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPUpdateProfile;

const inpHeight = MVS(38);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: MVS(12),
    paddingHorizontal: MS(18),
  },
  haderCon: {
    // backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: isIOS() ? MVS(8) : MVS(12),
    paddingHorizontal: MS(18),
  },
  cancelString: {
    color: COLORS.primary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
    includeFontPadding: false,
  },
  doneStringDisabledStyle: {
    color: COLORS.textDisabled,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
    includeFontPadding: false,
  },

  formCont: {rowGap: MVS(16)},
  profileAndNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(12),
  },
  profilePicCont: {
    backgroundColor: COLORS.offWhite,
    width: MS(100),
    height: MS(100),
    borderRadius: MS(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: '99%',
    height: '99%',
    borderRadius: MS(120),
  },
  firstAndLastNameCont: {
    flex: 1,
    marginTop: -MVS(24),
  },
  firstNameInput: {
    padding: 0,
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
    textAlignVertical: 'center',

    borderBottomWidth: 1,
    borderColor: COLORS.EDEDED,
    height: inpHeight,
  },
  editPhotoString: {
    color: COLORS.primary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
    textAlign: 'center',
    marginTop: MVS(8),
  },

  horiLine: {
    height: 1,
    backgroundColor: COLORS.EDEDED,
  },
  commonView: {
    height: inpHeight,
    borderBottomWidth: 1,
    borderColor: COLORS.EDEDED,
    flexDirection: 'row',
  },
});
