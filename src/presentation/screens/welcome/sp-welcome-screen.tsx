import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {_color, _ms, _mvs, _screens, _styles} from '../../../misc';
import {_fonts, _images} from '../../../assets';
import {CustomBottomShitModal, PrimaryButton, SafeAreaWrapper} from '../../components';
import LocationPermissionPopup from './components/location-permission-popup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types/types';

const SPWelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showBottomShit, setShowBottomShit] = useState(true);

  const _handleCreateAccountClick = () => {
    navigation.navigate(_screens.authStack, {
      screen: _screens.spSignupScreen,
    });
  };

  const _handleLoginClick = () => {
    navigation.navigate(_screens.authStack, {
      screen: _screens.spLoginScreen,
    });
  };

  return (
    <SafeAreaWrapper style={_styles.flex}>
      <View style={_styles.flex}>
        <Image
          source={_images.spWelcomeScreen}
          style={styles.img}
          resizeMode="cover"
          accessibilityLabel="Tow Truck & Car"
          accessibilityRole="image"
        />
      </View>
      <View style={styles.contentCont}>
        <View>
          <Text style={styles.welcomeString}>Welcome</Text>
          <Text style={styles.welDescString}>Have a better sharing experience</Text>
        </View>

        <View style={styles.btnCont}>
          <PrimaryButton title="Create an account" onPress={_handleCreateAccountClick} />
          <PrimaryButton
            title="Log In"
            buttonStyle={styles.logInBtn}
            textStyle={styles.logInBtnString}
            onPress={_handleLoginClick}
          />
        </View>
      </View>

      {showBottomShit && (
        <CustomBottomShitModal animationValue={0}>
          <LocationPermissionPopup onPress={() => setShowBottomShit(false)} />
        </CustomBottomShitModal>
      )}
    </SafeAreaWrapper>
  );
};

export default SPWelcomeScreen;

const styles = StyleSheet.create({
  contentCont: {
    flex: 1,
    justifyContent: 'space-around',
  },
  img: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: _ms(28),
    borderBottomRightRadius: _ms(28),
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
