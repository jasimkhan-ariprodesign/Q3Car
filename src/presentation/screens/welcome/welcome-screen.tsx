import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {_color, _ms, _mvs, _screens, _styles, _width} from '../../../misc';
import {_fonts, _images} from '../../../assets';
import {CustomBottomShitModal, PrimaryButton, SafeAreaWrapper} from '../../components';
import LocationPermissionPopup from './components/location-permission-popup';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();
  const [showBottomShit, setShowBottomShit] = useState(true);

  const _handleCreateAccount = () => {
    navigation.push(_screens.signupScreen);
  };

  return (
    <SafeAreaWrapper style={_styles.flex}>
      <ImageBackground source={_images.welcomeScreen} style={styles.bgImg}>
        <View style={styles.btnCont}>
          <PrimaryButton title="Create an account" onPress={_handleCreateAccount} />
          <PrimaryButton
            title="Log In"
            buttonStyle={styles.logInBtn}
            textStyle={styles.logInBtnString}
          />
        </View>

        <View>
          <Text style={styles.welcomeString}>Welcome</Text>
          <Text style={styles.welDescString}>Have a better sharing experience</Text>
        </View>
      </ImageBackground>

      {showBottomShit && (
        <CustomBottomShitModal animationValue={0}>
          <LocationPermissionPopup onPress={() => setShowBottomShit(false)} />
        </CustomBottomShitModal>
      )}
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
    width: _width,
    rowGap: _mvs(28),
    flexDirection: 'column-reverse',
    paddingBottom: _mvs(40),
  },
  welcomeString: {
    color: _color.primary,
    fontSize: _ms(20),
    fontFamily: _fonts.workSansMedium,
    textAlign: 'center',
  },
  welDescString: {
    color: _color.black,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansRegular,
    textAlign: 'center',
  },
  btnCont: {
    paddingHorizontal: _ms(22),
    rowGap: _mvs(16),
  },
  logInBtn: {
    backgroundColor: _color.transparent,
    borderWidth: 1,
    borderColor: _color.primary,
    marginHorizontal: 1,
  },
  logInBtnString: {
    color: _color.textPrimary,
  },
});
