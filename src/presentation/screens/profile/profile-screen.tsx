import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COMMON_STYLES, isIOS, MVS, MS, COLORS} from '../../../misc';
import {SafeAreaWrapper, SecondaryHeader} from '../../components';
import {SecondaryLoader} from '../../../common';
import {FONTS, ICONS} from '../../../assets';

const ProfileScreen = () => {
  const [receiveReceiptEmails, setReceiveReceiptEmails] = useState(false);

  const _renderUserNameAndProfileCont = () => {
    return (
      <View style={styles.headerStyle}>
        <Text style={styles.nameString}>Hey Dennis !</Text>
        <View style={styles.profileView}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/b8/99/00/b8990034ff80c63eb42d27cdff0f7f24.jpg',
            }}
            style={styles.profile}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  const _renderUserDetailsViewCont = () => {
    return (
      <>
        {/* name */}
        <View style={styles.inputCont}>
          <Text style={styles.labelString}>NAME</Text>
          <TextInput style={styles.nameInputStyle} value={'Shane Mendoza'} editable={false} />
        </View>

        {/* email */}
        <View style={styles.inputCont}>
          <Text style={styles.labelString}>EMAIL</Text>
          <TextInput
            style={styles.nameInputStyle}
            value={'freeslab88@gmail.com'}
            editable={false}
          />
        </View>

        {/* phone */}
        <View style={styles.inputCont}>
          <Text style={styles.labelString}>PHONE NUMBER</Text>
          <TextInput style={styles.nameInputStyle} value={'470-499-4964'} editable={false} />
        </View>
      </>
    );
  };

  const _renderPreferenceCont = () => {
    return (
      <View style={[styles.inputCont, styles.margTop]}>
        <Text style={styles.labelString}>Preferences</Text>
        <View style={styles.preferencesCont}>
          <View style={styles.switchCont}>
            <Text style={styles.recieveReceiptsString}>Receive receipt emails</Text>
            <Switch
              value={receiveReceiptEmails}
              onValueChange={() => {
                setReceiveReceiptEmails(!receiveReceiptEmails);
              }}
              thumbColor={COLORS.white}
              trackColor={{
                false: COLORS.CFCFCF,
                true: COLORS.primary,
              }}
            />
          </View>
          <Text style={styles.descString}>
            Stay up to date with our news and cool{'\n'}promos and receive a more personalized
            experience.
          </Text>
        </View>
      </View>
    );
  };

  const _renderSocialNetwork = () => {
    return (
      <View style={[styles.inputCont, styles.margTop]}>
        <Text style={styles.labelString}>Social Network</Text>

        {/* facebook button */}
        <TouchableOpacity style={styles.socialBTN}>
          <Image
            source={ICONS.facebookWhite}
            style={[COMMON_STYLES.size24, styles.socialIconStyle]}
            resizeMode="contain"
          />
          <Text style={styles.socialBTNString}>Connect with Facebook</Text>
        </TouchableOpacity>

        {/* google button */}
        <TouchableOpacity style={[styles.socialBTN, styles.googleBTN]}>
          <Image
            source={ICONS.google}
            style={[COMMON_STYLES.size24, styles.socialIconStyle]}
            resizeMode="contain"
          />
          <Text style={[styles.socialBTNString, {color: COLORS.black}]}>Connect with Google</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[COMMON_STYLES.flex]}
      behavior={isIOS() ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: MVS(8)})}>
      <SafeAreaWrapper>
        <SecondaryHeader containerStyle={styles.backIconStyle} />

        <View style={COMMON_STYLES.flex}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle}>
            {/* user name & profile */}
            {_renderUserNameAndProfileCont()}

            {/* user details  */}
            {_renderUserDetailsViewCont()}

            {/* preference */}
            {_renderPreferenceCont()}

            {/* social network */}
            {_renderSocialNetwork()}
          </ScrollView>

          {/* loader */}
          {/* <SecondaryLoader /> */}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const authFieldHeight = MS(36);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  backIconStyle: {paddingHorizontal: MS(18)},
  contentContainerStyle: {
    rowGap: MVS(18),
    paddingHorizontal: MS(20),
    paddingBottom: MVS(20),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileView: {
    backgroundColor: COLORS.transparentBlack1,
    width: MS(70),
    height: MS(70),
    borderRadius: MS(70),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  nameString: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.workSansBold,
    fontSize: MS(20),
  },
  profile: {
    width: MS(70),
    height: MS(70),
    borderRadius: MS(70),
  },
  inputCont: {
    rowGap: MVS(4),
  },
  labelString: {
    color: COLORS.textSecondary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansBold,
    textTransform: 'uppercase',
  },
  nameInputStyle: {
    padding: 0,
    borderWidth: bdrWidth,
    borderColor: COLORS.EDEDED,
    borderRadius: 4,
    height: authFieldHeight,
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    textAlignVertical: 'center',
    paddingLeft: MS(12),
  },
  preferencesCont: {
    borderWidth: bdrWidth,
    borderColor: COLORS.EDEDED,
    borderRadius: 4,
    padding: MS(12),
    backgroundColor: COLORS.primaryLight,
  },
  switchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recieveReceiptsString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    textTransform: 'uppercase',
  },
  descString: {
    color: COLORS.textDisabled,
    fontSize: MS(10),
    fontFamily: FONTS.workSansRegular,
    maxWidth: '80%',
  },
  socialBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    height: authFieldHeight,
    borderRadius: 4,
  },
  socialBTNString: {
    color: COLORS.white,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
  },
  socialIconStyle: {
    position: 'absolute',
    left: MS(12),
  },
  googleBTN: {
    borderWidth: bdrWidth,
    borderColor: COLORS.EDEDED,
    backgroundColor: COLORS.white,
    marginTop: MVS(8),
  },
  margTop: {
    marginTop: MVS(20),
  },
});
