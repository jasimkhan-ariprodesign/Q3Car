import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PrimaryButton, SafeAreaWrapper} from '../../components';
import {COLORS, WINDOW_HEIGHT, MS, MVS, SCREENS} from '../../../misc';
import {FONTS, IMAGES} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';

const UserTypeSelectScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleFindTowService = () => {
    navigation.push(SCREENS.welcomeStack, {
      screen: SCREENS.welcomeScreen,
    });
  };

  const _handlePublishTowingService = () => {
    navigation.push(SCREENS.welcomeStack, {
      screen: SCREENS.spWelcomeScreen,
    });
  };

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Hello!</Text>

        <Image source={IMAGES.userType} style={styles.imgStyle} resizeMode="contain" />

        <View style={styles.buttonCont}>
          <PrimaryButton title="Find a Towing Service" onPress={_handleFindTowService} />
          <PrimaryButton
            title="Publish a Towing Service"
            buttonStyle={styles.publishBtn}
            textStyle={styles.publishString}
            onPress={_handlePublishTowingService}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default UserTypeSelectScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: MS(22),
    paddingTop: MVS(24),
    rowGap: MVS(40),
  },
  title: {
    color: COLORS.black,
    fontSize: MS(20),
    fontFamily: FONTS.workSansRegular,
  },
  imgStyle: {
    width: '100%',
    height: WINDOW_HEIGHT * 0.4,
  },
  buttonCont: {
    gap: MVS(12),
  },
  publishBtn: {
    backgroundColor: COLORS.transparent,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginHorizontal: 1,
  },
  publishString: {
    color: COLORS.black,
  },
});
