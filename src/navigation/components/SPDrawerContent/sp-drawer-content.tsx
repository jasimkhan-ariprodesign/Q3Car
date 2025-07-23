import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {COLORS, MS, MVS, SCREENS, COMMON_STYLES} from '../../../misc';
import {IconButton, SafeAreaWrapper} from '../../../presentation/components';
import {FONTS, ICONS} from '../../../assets';
import {logger} from '../../../utils';
import {RootStackParamList, SPStackParamList} from '../../types/types';
import {SP_DRAWER_MENU_LIST} from '../../../constant';

const SPDrawerContent = (prop: DrawerContentComponentProps) => {
  //   _logger.info('prop -->', prop);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleProfileClick = () => {
    navigation.push(SCREENS.SPStack, {
      screen: SCREENS.SPProfileScreen,
    });
    prop?.navigation?.closeDrawer();
  };

  const _handleDrawerBTNClick = (route: keyof SPStackParamList) => {
    if (route) {
      // logger.warn(route)
      navigation.push(SCREENS.SPStack, {
        screen: route,
      });
      prop?.navigation?.closeDrawer();
    }
  };

  const _renderProfileCont = () => {
    return (
      <View style={styles.profileView}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/736x/b8/99/00/b8990034ff80c63eb42d27cdff0f7f24.jpg',
          }}
          style={styles.profile}
          resizeMode="cover"
        />
      </View>
    );
  };

  const _renderProfileButton = () => {
    return (
      <TouchableOpacity onPress={_handleProfileClick} style={styles.profileBTN}>
        <Text style={styles.profileNameString}>Shane Mendoza</Text>
        <IconButton
          icon={ICONS.angleLeftDark}
          iconStyle={styles.rightArrow}
          tintColor={COLORS.white}
        />
      </TouchableOpacity>
    );
  };

  //   drawer list render
  const _renderItem = ({item, index}: {item: any; index: number}) => {
    // logger.log('item -->', item);
    return (
      <View>
        <TouchableHighlight
          underlayColor={`${COLORS.primary}0D`}
          activeOpacity={0.6}
          onPress={() => _handleDrawerBTNClick(item?.routeName)}
          style={styles.drawerBTN}>
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
        data={SP_DRAWER_MENU_LIST || []}
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
        <Text style={styles.phoneString}>470-499-4964</Text>
      </SafeAreaWrapper>

      {/* flatlist cont  */}
      <View style={styles.drawerBTNListCont}>{_renderDrawerMenuButtons()}</View>
    </View>
  );
};

export default SPDrawerContent;

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
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profile: {
    width: MS(70),
    height: MS(70),
    borderRadius: MS(70),
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
    transform: [{rotate: '180deg'}],
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
