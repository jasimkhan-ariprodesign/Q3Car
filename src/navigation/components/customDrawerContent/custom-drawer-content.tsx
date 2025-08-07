import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, MS, MVS, SCREENS, COMMON_STYLES } from '../../../misc';
import { IconButton, SafeAreaWrapper } from '../../../presentation/components';
import { FONTS, ICONS } from '../../../assets';
import { DRAWER_MENU_LIST } from '../../../constant/drawer-menu-list';
import { AppStackParamList, RootStackParamList } from '../../types/types';
import { RootState } from '../../../redux';
import { appAlert, logger } from '../../../utils';
import { SecondaryLoader } from '../../../common';
import { clearUserData, clearUserType } from '../../../redux/slices';
import { resetUserData } from '../../../utils/authStorage/auth-storage';

const CustomDrawerContent = (prop: DrawerContentComponentProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData?.data?.user);
  const { fullName = 'Profile', phone = '', avatar = '' } = userData || {};
  const [tempLoader, setTempLoader] = useState(false);
  logger.log('tempLoader: ', tempLoader);

  const _handleProfileClick = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.profileScreen,
    });
    prop?.navigation?.closeDrawer();
  };

  const _handleLogoutClick = async () => {
    setTempLoader(true);
    try {
      const result = await resetUserData();
      logger.log('Keychain reset success: ', result);

      dispatch(clearUserData());
      dispatch(clearUserType());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREENS.welcomeStack,
            state: {
              index: 0,
              routes: [{ name: SCREENS.splash }],
            },
          },
        ],
      });
    } catch (error) {
      logger.info('_handleLogoutClick error: ', error);
    } finally {
      setTempLoader(false);
    }
  };

  const _handleDrawerBTNClick = (route: keyof AppStackParamList) => {
    if (route) {
      if (route === ('Logout' as any)) {
        appAlert.confirmWithOptions({
          title: 'Logout',
          message: 'Are you sure you want to logout?',
          onCancel() {
            prop?.navigation?.closeDrawer();
          },
          okText: 'Confirm',
          onOk() {
            _handleLogoutClick();
          },
        });
        return;
      }

      navigation.push(SCREENS.appStack, {
        screen: route,
      });
      prop?.navigation?.closeDrawer();
    }
  };

  const _renderProfileCont = () => {
    return (
      <View style={styles.profileView}>
        <Image source={avatar ? { uri: avatar } : ICONS.profilePicture} style={styles.profile} resizeMode="cover" />
      </View>
    );
  };

  const _renderProfileButton = () => {
    return (
      <TouchableOpacity onPress={_handleProfileClick} style={styles.profileBTN}>
        <Text style={styles.profileNameString}>{fullName}</Text>
        <IconButton icon={ICONS.angleLeftDark} iconStyle={styles.rightArrow} tintColor={COLORS.white} />
      </TouchableOpacity>
    );
  };

  //   drawer list render
  const _renderItem = ({ item, index }: { item: any; index: number }) => {
    // logger.log('item -->', item);
    return (
      <View>
        <TouchableHighlight
          underlayColor={`${COLORS.primary}0D`}
          activeOpacity={0.6}
          onPress={() => _handleDrawerBTNClick(item?.routeName)}
          style={styles.drawerBTN}
        >
          <View style={styles.drawerBTNView}>
            <Image
              source={item?.icon || ''}
              style={COMMON_STYLES.size16}
              resizeMode="contain"
              tintColor={COLORS.drawerIconColor}
            />
            <Text style={styles.titleString}>{item.title || ''}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  //   drawer menu buttons
  const _renderDrawerMenuButtons = () => {
    return (
      <FlatList
        data={DRAWER_MENU_LIST || []}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item?.id?.toString() || index?.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />
    );
  };

  const _renderLoader = () => {
    if (tempLoader) {
      return <SecondaryLoader />;
    }
    return null;
  };

  // main view
  return (
    <View style={COMMON_STYLES.container}>
      <SafeAreaWrapper style={styles.profileCont}>
        {/* profile cont */}
        {_renderProfileCont()}

        {/* profile navigation button */}
        {_renderProfileButton()}

        {/* phone number */}
        <Text style={styles.phoneString}>{phone}</Text>
      </SafeAreaWrapper>

      {/* flatlist cont  */}
      <View style={styles.drawerBTNListCont}>{_renderDrawerMenuButtons()}</View>

      {/* loader */}
      {_renderLoader()}
    </View>
  );
};

export default CustomDrawerContent;

const leftSpace = MS(24);
const styles = StyleSheet.create({
  profileCont: {
    backgroundColor: COLORS.primary,
    flex: 0,
    padding: leftSpace,
    rowGap: MVS(6),
  },
  profileView: {
    backgroundColor: COLORS.transparentBlack2,
    width: MS(70),
    height: MS(70),
    borderRadius: MS(70),
  },
  profile: {
    width: '99%',
    height: '99%',
    borderRadius: MS(35),
  },
  profileBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: MVS(12),
  },
  profileNameString: {
    color: COLORS.white,
    fontSize: MS(14),
    fontFamily: FONTS.workSansBold,
  },
  rightArrow: {
    ...COMMON_STYLES.size12,
    transform: [{ rotate: '180deg' }],
  },
  phoneString: {
    color: COLORS.FF9391,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    includeFontPadding: false,
  },

  drawerBTNListCont: {
    flex: 1,
    paddingHorizontal: leftSpace / 2,
    paddingTop: leftSpace,
  },
  drawerBTN: {
    borderRadius: 8,
  },
  drawerBTNView: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(12),
    paddingVertical: MVS(8),
    paddingHorizontal: leftSpace / 2,
  },
  titleString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansSemiBold,
    includeFontPadding: false,
  },
  contentContainerStyle: {
    rowGap: MVS(8),
  },
});
