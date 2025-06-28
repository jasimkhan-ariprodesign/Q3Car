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
import {_styles, _isIOS, _mvs, _ms, _color} from '../../../misc';
import {SafeAreaWrapper, SecondaryHeader} from '../../components';
import {SecondaryLoader} from '../../../common';
import {_fonts, _icons} from '../../../assets';

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
      <View style={styles.inputCont}>
        <Text style={styles.labelString}>Preferences</Text>
        <View style={styles.preferencesCont}>
          <View style={styles.switchCont}>
            <Text style={styles.recieveReceiptsString}>Receive receipt emails</Text>
            <Switch
              value={receiveReceiptEmails}
              onValueChange={() => {
                setReceiveReceiptEmails(!receiveReceiptEmails);
              }}
              thumbColor={_color.white}
              trackColor={{
                false: _color.CFCFCF,
                true: _color.primary,
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
      <View style={styles.inputCont}>
        <Text style={styles.labelString}>Social Network</Text>

        {/* facebook button */}
        <TouchableOpacity style={styles.socialBTN}>
          <Image
            source={_icons.facebookWhite}
            style={[_styles.size24, styles.socialIconStyle]}
            resizeMode="contain"
          />
          <Text style={styles.socialBTNString}>Connect with Facebook</Text>
        </TouchableOpacity>

        {/* google button */}
        <TouchableOpacity style={[styles.socialBTN, styles.googleBTN]}>
          <Image
            source={_icons.google}
            style={[_styles.size24, styles.socialIconStyle]}
            resizeMode="contain"
          />
          <Text style={[styles.socialBTNString, {color: _color.black}]}>Connect with Google</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[_styles.flex]}
      behavior={_isIOS() ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.select({ios: _mvs(8)})}>
      <SafeAreaWrapper>
        <SecondaryHeader containerStyle={styles.backIconStyle} />

        <View style={_styles.flex}>
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

const authFieldHeight = _ms(36);
const gapAndMargin = _mvs(16);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  backIconStyle: {paddingHorizontal: _ms(18)},
  contentContainerStyle: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(20),
    paddingBottom: _mvs(20),
  },
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileView: {
    backgroundColor: _color.transparentBlack1,
    width: _ms(70),
    height: _ms(70),
    borderRadius: _ms(70),
    borderWidth: 2,
    borderColor: _color.white,
  },
  nameString: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansBold,
    fontSize: _ms(20),
  },
  profile: {
    width: _ms(70),
    height: _ms(70),
    borderRadius: _ms(70),
  },
  inputCont: {
    rowGap: _mvs(4),
  },
  labelString: {
    color: _color.textSecondary,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansBold,
    textTransform: 'uppercase',
  },
  nameInputStyle: {
    padding: 0,
    borderWidth: bdrWidth,
    borderColor: _color.EDEDED,
    borderRadius: 4,
    height: authFieldHeight,
    color: _color.black,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansRegular,
    textAlignVertical: 'center',
    paddingLeft: _ms(12),
  },
  preferencesCont: {
    borderWidth: bdrWidth,
    borderColor: _color.EDEDED,
    borderRadius: 4,
    padding: _ms(12),
    backgroundColor: _color.primaryLight,
  },
  switchCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recieveReceiptsString: {
    color: _color.textPrimary,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
    textTransform: 'uppercase',
  },
  descString: {
    color: _color.textDisabled,
    fontSize: _ms(10),
    fontFamily: _fonts.workSansRegular,
    maxWidth: '80%',
  },
  socialBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _color.primary,
    height: authFieldHeight,
    borderRadius: 4,
  },
  socialBTNString: {
    color: _color.white,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
  },
  socialIconStyle: {
    position: 'absolute',
    left: _ms(12),
  },
  googleBTN: {
    borderWidth: bdrWidth,
    borderColor: _color.EDEDED,
    backgroundColor: _color.white,
    marginTop: _mvs(8),
  },
});
