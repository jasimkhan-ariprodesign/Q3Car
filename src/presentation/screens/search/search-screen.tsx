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
import {_styles, _isIOS, _color, _mvs, _ms, _screens} from '../../../misc';
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
    navigation.push(_screens.appStack, {
      screen: _screens.selectCarType,
    });
  };

  const _renderPickupPointInpCont = () => {
    return (
      <View style={styles.searchBarParentView}>
        <IconButton
          icon={_icons.locationBlack}
          iconStyle={_styles.size18}
          tintColor={_color.textPrimary}
        />
        <TextInput
          placeholder="Search Address Here"
          placeholderTextColor={_color.textPrimary}
          style={styles.inputStyle}
        />
        <IconButton
          icon={_icons.closeBlack}
          iconStyle={_styles.size10}
          resizeMode="contain"
          tintColor={_color.textPrimary}
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
          style={[_styles.size16, styles.itemIcon]}
          resizeMode="contain"
          tintColor={_color.textPrimary}
        />
        <View style={_styles.flex}>
          <Text style={styles.itemTitleString}>{item?.title}</Text>
          <Text style={styles.itemDescString}>{item?.address}</Text>
        </View>
        <Text style={styles.itemTitleString}>{item?.distance}</Text>
      </TouchableOpacity>
    );
  };

  const _renderSearchHistoryListsCont = () => {
    return (
      <View style={_styles.flex}>
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
    <KeyboardAvoidingView style={_styles.flex} behavior={_isIOS() ? 'padding' : 'height'}>
      <SafeAreaWrapper>
        <View style={styles.headerCont}>
          <PrimaryHeader containerStyle={styles.headerStyle} />
        </View>
        <View style={[_styles.flex, styles.container]}>
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
const leftSpace = _ms(16);
const bWidth = 1.2;
const bColor = _color.textSecondary;
const bRadius = 8;

const styles = StyleSheet.create({
  container: {
    rowGap: _mvs(12),
  },
  headerCont: {
    flexDirection: 'row',
    paddingLeft: leftSpace,
  },
  headerStyle: {
    paddingTop: _isIOS() ? 0 : _mvs(12),
    paddingBottom: _isIOS() ? _mvs(16) : _mvs(16),
  },

  searchBarParentView: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: bWidth,
    borderColor: bColor,
    borderRadius: bRadius,
    height: _inputFieldHeight,
    paddingHorizontal: _ms(8),
    columnGap: _ms(8),
  },
  inputStyle: {
    padding: 0,
    textAlignVertical: 'center',
    height: _inputFieldHeight,
    flex: 1,
    fontSize: _ms(12),
    color: _color.textPrimary,
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
    color: _color.textPrimary,
    fontSize: _ms(14),
    fontFamily: _fonts.poppinsMedium,
    includeFontPadding: false,
  },
  clearAllString: {
    color: _color.yellow,
  },

  //   flatlist
  contentContainerStyle: {
    rowGap: _mvs(16),
  },
  itemBTNStyle: {
    marginHorizontal: leftSpace,
    flexDirection: 'row',
    columnGap: _ms(12),
    paddingVertical: _ms(2),
  },
  itemIcon: {marginTop: _mvs(2)},
  itemTitleString: {
    fontSize: _ms(14),
    color: _color.textPrimary,
    fontFamily: _fonts.poppinsMedium,
    includeFontPadding: false,
  },
  itemDescString: {
    fontSize: _ms(10),
    color: _color.textPrimary,
    fontFamily: _fonts.poppinsRegular,
    includeFontPadding: false,
  },
});
