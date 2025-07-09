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
import {COLORS, _ms, _mvs, SCREENS, COMMON_STYLES} from '../../../misc';
import {IconButton, SafeAreaWrapper} from '../../../presentation/components';
import {_fonts, _icons} from '../../../assets';
import {_drawerMenuList} from '../../../constant/drawer-menu-list';
import {_logger} from '../../../utils';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

const CustomDrawerContent = (prop: DrawerContentComponentProps) => {
  //   _logger.info('prop -->', prop);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleProfileClick = () => {
    prop.navigation.closeDrawer();
    navigation.navigate(SCREENS.appStack, {
      screen: SCREENS.profileScreen,
    });
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
          icon={_icons.angleLeftDark}
          iconStyle={styles.rightArrow}
          tintColor={COLORS.white}
        />
      </TouchableOpacity>
    );
  };

  //   drawer list render
  const _renderItem = ({item, index}: {item: any; index: number}) => {
    _logger.log('item -->', item);
    return (
      <View>
        <TouchableHighlight
          underlayColor={`${COLORS.primary}0D`}
          activeOpacity={0.6}
          onPress={() => {}}
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
        data={_drawerMenuList || []}
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

export default CustomDrawerContent;

const leftSpace = _ms(24);
const styles = StyleSheet.create({
  profileCont: {
    backgroundColor: COLORS.primary,
    flex: 0,
    padding: leftSpace,
    rowGap: _mvs(6),
  },
  profileView: {
    backgroundColor: COLORS.transparentBlack2,
    width: _ms(70),
    height: _ms(70),
    borderRadius: _ms(70),
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profile: {
    width: _ms(70),
    height: _ms(70),
    borderRadius: _ms(70),
  },
  profileBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: _mvs(12),
  },
  profileNameString: {
    color: COLORS.white,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansBold,
  },
  rightArrow: {
    ...COMMON_STYLES.size12,
    transform: [{rotate: '180deg'}],
  },
  phoneString: {
    color: COLORS.FF9391,
    fontSize: _ms(12),
    fontFamily: _fonts.workSansMedium,
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
    columnGap: _ms(12),
    paddingVertical: _mvs(4),
    paddingHorizontal: leftSpace / 2,
  },
  titleString: {
    color: COLORS.black,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansSemiBold,
  },
  contentContainerStyle: {
    rowGap: _mvs(12),
  },
});
