import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Formik, FormikProps} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaWrapper, TextButton} from '../../components';
import {COLORS, COMMON_STYLES, isIOS, MS, MVS} from '../../../misc';
import {FONTS, ICONS} from '../../../assets';
import {RootStackParamList} from '../../../navigation/types/types';
import {CameraOrGalleryPopup, SecondaryLoader} from '../../../common';
import {launchCameraUtil, launchGalleryUtil, logger} from '../../../utils';
import {getDefaultUiState, getInitialLoadingState, UiState} from '../../../utils/uiState/ui-state';

export const _updateProfileSchema = Yup.object().shape({
  profileAvatar: Yup.string().required('Profile is required'),

  firstName: Yup.string().min(2, 'First name is too short').required('First name is required'),
  lastName: Yup.string().required('Last name is required'),

  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(7, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .required('Phone number is required'),

  email: Yup.string().email('Invalid email address').required('Email is required'),
  countryCode: Yup.string().required('Required'),

  gender: Yup.string().required('Gender is required'),
  birthday: Yup.string().required('Birthday is required'),
});

type FormValues = {
  profileAvatar: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthday: string;
};

const SPUpdateProfile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const defaultState: UiState<any> = getDefaultUiState();
  const formikRef = useRef<FormikProps<FormValues>>(null);

  const [showProfilePopup, setShowProfilePopup] = useState<boolean>(false);
  const [uiStateUpdateProfile, setUiStateUpdateProfile] = useState<UiState<any>>(defaultState);
  logger.log('uiStateUpdateProfile --> ', uiStateUpdateProfile);

  const _handleCancelClick = () => {
    navigation?.goBack();
  };

  const _handleProfileClick = () => {
    setShowProfilePopup(prev => !prev);
  };

  const _handleProfileSelect = async (type: 'Camera' | 'Gallery') => {
    setUiStateUpdateProfile(getInitialLoadingState());
    try {
      const launchFn = type === 'Camera' ? launchCameraUtil : launchGalleryUtil;
      const selectedImageURI = await launchFn();

      if (!selectedImageURI) {
        logger.log('No image was selected or captured');
        return;
      }

      formikRef.current?.setFieldValue?.('profileAvatar', selectedImageURI);
    } catch (error) {
      logger.log('handleProfileSelect Error', error);
    } finally {
      _handleProfileClick();
      setUiStateUpdateProfile(getDefaultUiState());
    }
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
          innerRef={formikRef}
          initialValues={{
            profileAvatar: '',
            firstName: 'Martha',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: '',
            birthday: '',
          }}
          validationSchema={_updateProfileSchema}
          onSubmit={values => console.log(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <View style={styles.formCont}>
              {/* profile & name  */}

              <View style={styles.profileAndNameCont}>
                <View>
                  <View style={styles.profilePicCont}>
                    <Image
                      source={{uri: values?.profileAvatar || undefined}}
                      style={styles.profilePic}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={_handleProfileClick}
                      style={styles.profilePicBTN}>
                      <Image
                        source={ICONS.cameraWhite}
                        style={COMMON_STYLES.size32}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.editPhotoString}>Edit Photo</Text>
                </View>

                <View style={styles.firstAndLastNameCont}>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.firstNameInput}
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    autoCorrect={false}
                  />
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.firstNameInput}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    autoCorrect={false}
                  />
                </View>
              </View>

              {/* horizontal line */}

              <View style={styles.horiLine} />

              {/* all other details */}
              <View>
                {/* phone */}
                <View style={styles.commonView}>
                  <Text style={styles.labelString}>Phone number</Text>

                  <TextInput
                    placeholder="584-490-9153"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.commonInputStyle}
                  />
                </View>

                {/* email */}
                <View style={styles.commonView}>
                  <Text style={styles.labelString}>Email</Text>

                  <TextInput
                    placeholder="freeslab88@gmail.com"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.commonInputStyle}
                  />
                </View>

                {/* gender */}
                <View style={styles.commonView}>
                  <Text style={styles.labelString}>Gender</Text>

                  <TextInput
                    placeholder="Female"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.commonInputStyle}
                  />
                </View>

                {/* d-o-b */}
                <View style={styles.commonView}>
                  <Text style={styles.labelString}>Birthday</Text>

                  <TextInput
                    placeholder="April 16, 1988"
                    placeholderTextColor={COLORS.textDisabled}
                    style={styles.commonInputStyle}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </>
    );
  };

  const _renderProfilePopup = () => {
    return (
      <>
        <CameraOrGalleryPopup
          closePopupFunc={_handleProfileClick}
          onSelectImageType={_handleProfileSelect}
        />
      </>
    );
  };

  const _renderLoader = () => {
    return <SecondaryLoader />;
  };

  //   main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        {/* back & done container view */}
        {_renderHeader()}

        <View style={COMMON_STYLES.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            <>
              {/* content */}
              {_renderCont()}
            </>
          </ScrollView>

          {/* pop to select camera or gallery */}
          {showProfilePopup && _renderProfilePopup()}

          {/* loader */}
          {uiStateUpdateProfile?.isLoading && _renderLoader()}
        </View>
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
    backgroundColor: COLORS.white,
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
  profilePicBTN: {
    backgroundColor: COLORS.transparentBlack2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: MS(100),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
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
    alignItems: 'center',
    columnGap: MS(4),
  },
  labelString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
    flex: 1,
  },
  commonInputStyle: {
    padding: 0,
    height: '98%',
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'right',
    width: '65%',
  },
});
