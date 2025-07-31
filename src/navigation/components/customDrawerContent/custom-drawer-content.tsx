import { FlatList, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { COLORS, MS, MVS, SCREENS, COMMON_STYLES } from '../../../misc';
import { IconButton, SafeAreaWrapper } from '../../../presentation/components';
import { FONTS, ICONS } from '../../../assets';
import { DRAWER_MENU_LIST } from '../../../constant/drawer-menu-list';
import { logger } from '../../../utils';
import { AppStackParamList, RootStackParamList } from '../../types/types';
import { RootState } from '../../../redux';

const CustomDrawerContent = (prop: DrawerContentComponentProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const userData = useSelector((state: RootState) => state.user.userData?.data?.user);
  const { fullName = 'Profile', phone = '', avatar = '' } = userData || {};

  const _handleProfileClick = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.profileScreen,
    });
    prop?.navigation?.closeDrawer();
  };

  const _handleDrawerBTNClick = (route: keyof AppStackParamList) => {
    if (route) {
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
            <Image source={item?.icon || ''} style={COMMON_STYLES.size16} resizeMode="contain" />
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
  },
  contentContainerStyle: {
    rowGap: MVS(8),
  },
});
