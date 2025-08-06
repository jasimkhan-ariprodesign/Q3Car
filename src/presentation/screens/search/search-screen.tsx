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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {COMMON_STYLES, isIOS, COLORS, MVS, MS, SCREENS} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader, IconButton, TextButton} from '../../components';
import {_inputFieldHeight} from '../../../misc/common-styles';
import {FONTS, ICONS} from '../../../assets';
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
          icon={ICONS.locationBlack}
          iconStyle={COMMON_STYLES.size18}
          tintColor={COLORS.textPrimary}
        />
        <TextInput
          placeholder="Search Address Here"
          placeholderTextColor={COLORS.textPrimary}
          style={styles.inputStyle}
        />
        <IconButton
          icon={ICONS.closeBlack}
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
          source={ICONS.clockGrey}
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
const leftSpace = MS(16);
const bWidth = 1.2;
const bColor = COLORS.textSecondary;
const bRadius = 8;

const styles = StyleSheet.create({
  container: {
    rowGap: MVS(12),
  },
  headerCont: {
    flexDirection: 'row',
    paddingLeft: leftSpace,
  },
  headerStyle: {
    paddingTop: isIOS() ? 0 : MVS(12),
    paddingBottom: isIOS() ? MVS(16) : MVS(16),
  },

  searchBarParentView: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: bWidth,
    borderColor: bColor,
    borderRadius: bRadius,
    height: _inputFieldHeight,
    paddingHorizontal: MS(8),
    columnGap: MS(8),
  },
  inputStyle: {
    padding: 0,
    textAlignVertical: 'center',
    height: _inputFieldHeight,
    flex: 1,
    fontSize: MS(12),
    color: COLORS.textPrimary,
    fontFamily: FONTS.poppinsMedium,
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
    fontSize: MS(14),
    fontFamily: FONTS.poppinsMedium,
    includeFontPadding: false,
  },
  clearAllString: {
    color: COLORS.yellow,
  },

  //   flatlist
  contentContainerStyle: {
    rowGap: MVS(16),
  },
  itemBTNStyle: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    columnGap: MS(12),
    paddingVertical: MS(2),
  },
  itemIcon: {marginTop: MVS(2)},
  itemTitleString: {
    fontSize: MS(14),
    color: COLORS.textPrimary,
    fontFamily: FONTS.poppinsMedium,
    includeFontPadding: false,
  },
  itemDescString: {
    fontSize: MS(10),
    color: COLORS.textPrimary,
    fontFamily: FONTS.poppinsRegular,
    includeFontPadding: false,
  },
});
