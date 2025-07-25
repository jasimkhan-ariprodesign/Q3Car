import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, MS, MVS, SCREENS, COMMON_STYLES, WINDOW_WIDTH} from '../../../misc';
import {FONTS, IMAGES} from '../../../assets';
import {CustomBottomShitModal, PrimaryButton, SafeAreaWrapper} from '../../components';
import LocationPermissionPopup from './components/location-permission-popup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types/types';

const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showBottomShit, setShowBottomShit] = useState(true);

  const _handleCreateAccountClick = () => {
    navigation.navigate(SCREENS.authStack, {
      screen: SCREENS.signupScreen,
    });
  };

  const _handleLoginClick = () => {
    navigation.navigate(SCREENS.authStack, {
      screen: SCREENS.loginScreen,
    });
  };

  return (
    <SafeAreaWrapper style={COMMON_STYLES.flex}>
      <ImageBackground source={IMAGES.welcomeScreen} style={styles.bgImg}>
        <View style={styles.btnCont}>
          <PrimaryButton title="Create an account" onPress={_handleCreateAccountClick} />
          <PrimaryButton
            title="Log In"
            buttonStyle={styles.logInBtn}
            textStyle={styles.logInBtnString}
            onPress={_handleLoginClick}
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
    width: WINDOW_WIDTH,
    rowGap: MVS(28),
    flexDirection: 'column-reverse',
    paddingBottom: MVS(40),
  },
  welcomeString: {
    color: COLORS.primary,
    fontSize: MS(20),
    fontFamily: FONTS.workSansMedium,
    textAlign: 'center',
  },
  welDescString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    textAlign: 'center',
  },
  btnCont: {
    paddingHorizontal: MS(22),
    rowGap: MVS(16),
  },
  logInBtn: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 1,
  },
  logInBtnString: {
    color: COLORS.textPrimary,
  },
});
