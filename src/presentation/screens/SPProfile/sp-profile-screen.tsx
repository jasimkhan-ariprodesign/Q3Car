import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { _isIOS } from '../../../misc/platform';
import { SafeAreaWrapper, PrimaryHeader } from '../../components';
import { COLORS, COMMON_STYLES, MS, MVS, SCREENS } from '../../../misc';
import { FONTS, ICONS } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/types/types';
import { SecondaryLoader } from '../../../common';
import { useFetchUser } from '../profile/hooks/useFetchUser';
import { logger } from '../../../utils';

const SPProfileScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { fetchUserUiState, fetchUser } = useFetchUser();

  const user = fetchUserUiState?.data?.data?.[0] || {};
  const additionalData = fetchUserUiState?.data?.data?.[0]?.additionalInfo || {};

  const { fullName = '', email = '', phone = '', avatar = '', dob = '' } = user || {};
  const { driverLicense = '', driverLicenseImage = '', insuranceNumber = '', insuranceImage = '' } = additionalData || {};

  logger.info('additionalData: ', JSON.stringify(additionalData, null, 1));
  // logger.log('driverLicense: ', driverLicense);

  useEffect(() => {
    const getUserData = async () => {
      await fetchUser();
    };
    getUserData();
  }, []);

  const _handleEditClick = () => {
    navigation.push(SCREENS.SPStack, {
      screen: SCREENS.SPUpdateProfile,
    });
  };

  const _renderProfile = () => {
    return (
      <View style={styles.profileCont}>
        <View style={styles.profilePicCont}>
          <Image source={avatar ? { uri: avatar } : ICONS.profilePicture} style={styles.profilePic} resizeMode="cover" />
        </View>

        <Text style={styles.nameString}>{fullName}</Text>
      </View>
    );
  };

  // _renderInfoCont - child 👇🏻
  const _renderCommonView = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={styles.commonViewOne}>
        <Text style={styles.comTextOne}>{label || ''}</Text>

        <View style={styles.commonViewTwo}>
          <Text style={[styles.comTextOne, styles.comTextTwo]}>{value || ''}</Text>

          <Image source={ICONS.angleRightGrey} style={COMMON_STYLES.size12} resizeMode="contain" />
        </View>
      </View>
    );
  };

  // _renderInfoCont - child 👇🏻
  const _renderCommonViewWithImage = ({ label, value, url }: { label: string; value: string; url: string }) => {
    return (
      <View style={styles.comViewForImage}>
        <View style={[COMMON_STYLES.row, COMMON_STYLES.alignCenter]}>
          <Text style={styles.comTextOne}>{label || ''}</Text>
          <View style={styles.commonViewTwo}>
            <Text style={[styles.comTextOne, styles.comTextTwo]}>{value || ''}</Text>
            <Image source={ICONS.angleRightGrey} style={COMMON_STYLES.size12} resizeMode="contain" />
          </View>
        </View>
        {url && (
          <View style={styles.pictureCont}>
            <Image source={{ uri: url }} style={styles.comPicStyle} resizeMode="cover" />
          </View>
        )}
      </View>
    );
  };

  const _renderInfoCont = () => {
    return (
      <>
        <Text style={styles.InformationsString}>Informations</Text>
        {_renderCommonView({ label: 'Username', value: fullName })}
        {_renderCommonView({ label: 'Phone number', value: phone })}
        {_renderCommonView({ label: 'Email', value: email })}

        {_renderCommonViewWithImage({ label: 'Driver license', value: driverLicense, url: driverLicenseImage })}
        {_renderCommonViewWithImage({ label: 'Insurance number', value: insuranceNumber, url: insuranceImage })}
      </>
    );
  };

  const _renderHeader = () => {
    return (
      <>
        <PrimaryHeader
          containerStyle={COMMON_STYLES.headerStyle}
          rightBTNString="Edit"
          rightBTNStringStyle={styles.editString}
          rightBTNFunction={_handleEditClick}
          rightBTNDisabled={false}
        />
      </>
    );
  };

  const _renderLoader = () => {
    if (fetchUserUiState.isLoading) {
      return <SecondaryLoader />;
    }
    return null;
  };

  // main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        {/* header */}
        {_renderHeader()}
        <View style={COMMON_STYLES.flex}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.contentContainerStyle}>
            <>
              {/* profile */}
              {_renderProfile()}

              {/* horizontal line */}
              <View style={styles.horiLine} />

              {/* user info */}
              {_renderInfoCont()}
            </>
          </ScrollView>

          {/* loader  */}
          {_renderLoader()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SPProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    rowGap: MVS(16),
    paddingVertical: MVS(12),
    paddingHorizontal: MS(16),
  },
  editString: {
    fontFamily: FONTS.workSansMedium,
    color: COLORS.primary,
    fontSize: MS(14),
    includeFontPadding: false,
  },
  profileCont: {
    alignItems: 'center',
    rowGap: MVS(4),
  },
  profilePicCont: {
    backgroundColor: COLORS.offWhite,
    width: MS(120),
    height: MS(120),
    borderRadius: MS(120),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: '99%',
    height: '99%',
    borderRadius: MS(120),
  },
  nameString: {
    color: COLORS.black,
    fontFamily: FONTS.workSansBold,
    fontSize: MS(16),
    includeFontPadding: false,
    marginTop: MVS(8),
  },
  horiLine: {
    height: 1,
    backgroundColor: COLORS.EDEDED,
  },
  InformationsString: {
    color: COLORS.textSecondary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansSemiBold,
    includeFontPadding: false,
    textTransform: 'uppercase',
    marginLeft: MS(8),
  },
  commonViewOne: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    borderBottomWidth: 1.6,
    borderColor: COLORS.EDEDED,
    columnGap: MS(8),
    paddingRight: MS(6),
    paddingVertical: MVS(8),
    marginHorizontal: MS(8),
  },
  commonViewTwo: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(6),
    flex: 1,
    justifyContent: 'flex-end',
  },
  comTextOne: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
  comTextTwo: {
    color: COLORS.textPrimary,
    maxWidth: '85%',
  },
  comViewForImage: {
    marginHorizontal: MS(8),
    rowGap: MVS(12),
  },
  pictureCont: {
    backgroundColor: COLORS.offWhite,
    height: MVS(120),
    borderRadius: 8,
    marginHorizontal: MS(2),
    borderWidth: 1,
    borderColor: COLORS.offWhite,
    elevation: 0.5,
    shadowColor: COLORS.black,
  },
  comPicStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
