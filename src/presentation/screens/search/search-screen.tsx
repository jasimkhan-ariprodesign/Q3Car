import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COMMON_STYLES, isIOS, COLORS, mvs, ms, SCREENS} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader, IconButton, TextButton} from '../../components';
import {_inputFieldHeight} from '../../../misc/common-styles';
import {_fonts, _icons} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';
import {_recentPlaces} from '../../../constant';

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleMoveToNextScreen = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.selectCarType,
    });
  };

  const _renderPickupPointInpCont = () => {
    return (
      <View style={styles.searchBarParentView}>
        <IconButton
          icon={_icons.locationBlack}
          iconStyle={COMMON_STYLES.size18}
          tintColor={COLORS.textPrimary}
        />
        <TextInput
          placeholder="Search Address Here"
          placeholderTextColor={COLORS.textPrimary}
          style={styles.inputStyle}
        />
        <IconButton
          icon={_icons.closeBlack}
          iconStyle={COMMON_STYLES.size10}
          resizeMode="contain"
          tintColor={COLORS.textPrimary}
        />
      </View>
    );
  };

  const _renderRecentPlacesTitle = () => {
    return (
      <View style={styles.titleCont}>
        <Text style={styles.titleString}>Recent places</Text>
        <TextButton textStyle={styles.clearAllString} title="Clear All" />
      </View>
    );
  };

  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={_handleMoveToNextScreen} style={styles.itemBTNStyle}>
        <Image
          source={_icons.clockGrey}
          style={[COMMON_STYLES.size16, styles.itemIcon]}
          resizeMode="contain"
          tintColor={COLORS.textPrimary}
        />
        <View style={COMMON_STYLES.flex}>
          <Text style={styles.itemTitleString}>{item?.title}</Text>
          <Text style={styles.itemDescString}>{item?.address}</Text>
        </View>
        <Text style={styles.itemTitleString}>{item?.distance}</Text>
      </TouchableOpacity>
    );
  };

  const _renderSearchHistoryListsCont = () => {
    return (
      <View style={COMMON_STYLES.flex}>
        <FlatList
          data={_recentPlaces || []}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item?.id?.toString() || index?.toString()}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  // main view
  return (
    <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <View style={styles.headerCont}>
          <PrimaryHeader containerStyle={styles.headerStyle} />
        </View>
        <View style={[COMMON_STYLES.flex, styles.container]}>
          {/* pickup bar */}
          {_renderPickupPointInpCont()}

          {/* title - Recent places */}
          {_renderRecentPlacesTitle()}

          {/* search history lists */}
          {_renderSearchHistoryListsCont()}
        </View>
      </SafeAreaWrapper>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
const leftSpace = ms(16);
const bWidth = 1.2;
const bColor = COLORS.textSecondary;
const bRadius = 8;

const styles = StyleSheet.create({
  container: {
    rowGap: mvs(12),
  },
  headerCont: {
    flexDirection: 'row',
    paddingLeft: leftSpace,
  },
  headerStyle: {
    paddingTop: isIOS() ? 0 : mvs(12),
    paddingBottom: isIOS() ? mvs(16) : mvs(16),
  },

  searchBarParentView: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: bWidth,
    borderColor: bColor,
    borderRadius: bRadius,
    height: _inputFieldHeight,
    paddingHorizontal: ms(8),
    columnGap: ms(8),
  },
  inputStyle: {
    padding: 0,
    textAlignVertical: 'center',
    height: _inputFieldHeight,
    flex: 1,
    fontSize: ms(12),
    color: COLORS.textPrimary,
    fontFamily: _fonts.poppinsMedium,
    includeFontPadding: false,
  },
  titleCont: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleString: {
    color: COLORS.textPrimary,
    fontSize: ms(14),
    fontFamily: _fonts.poppinsMedium,
    includeFontPadding: false,
  },
  clearAllString: {
    color: COLORS.yellow,
  },

  //   flatlist
  contentContainerStyle: {
    rowGap: mvs(16),
  },
  itemBTNStyle: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    columnGap: ms(12),
    paddingVertical: ms(2),
  },
  itemIcon: {marginTop: mvs(2)},
  itemTitleString: {
    fontSize: ms(14),
    color: COLORS.textPrimary,
    fontFamily: _fonts.poppinsMedium,
    includeFontPadding: false,
  },
  itemDescString: {
    fontSize: ms(10),
    color: COLORS.textPrimary,
    fontFamily: _fonts.poppinsRegular,
    includeFontPadding: false,
  },
});
