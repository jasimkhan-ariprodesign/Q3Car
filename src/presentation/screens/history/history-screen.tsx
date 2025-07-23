import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_styles} from '../../../misc/common-styles';
import {SafeAreaWrapper, PrimaryHeader} from '../../components';
import {COLORS, COMMON_STYLES, MS, MVS, SCREENS} from '../../../misc';
import {HISTORY_DATA} from '../../../constant';
import {FONTS, ICONS} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';

const HistoryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleHistoryDetailOpen = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.historyDetailsScreen,
    });
  };

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.itemBTNCont}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={_handleHistoryDetailOpen}
          style={styles.itemBTN}>
          <View style={styles.itemBTNLeftView}>
            <View style={styles.vehicleIconCont}></View>

            <View style={styles.stringCont}>
              <Text style={styles.itemTitleString}>{item?.title}</Text>
              <Text style={styles.itemDateString}>{item?.dateTime}</Text>
              <Text style={styles.itemDateString}>{item?.price}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.rebookBTN}>
            <Image
              source={ICONS.reloadGrey}
              style={COMMON_STYLES.size14}
              resizeMode="contain"
              tintColor={COLORS.white}
            />
            <Text style={styles.rebookString}>Rebook</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderHistoryLists = () => {
    return (
      <>
        <FlatList
          data={HISTORY_DATA || []}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item?.id?.toString() || index?.toString()}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </>
    );
  };

  //   main view
  return (
    <SafeAreaWrapper>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={_styles.flex}>
        {/* history data list */}
        {_renderHistoryLists()}
      </View>
    </SafeAreaWrapper>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  itemBTNCont: {
    backgroundColor: COLORS.F7F7F7,
    marginHorizontal: MS(18),
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0},
    borderRadius: 4,
    paddingVertical: MS(8),
    paddingHorizontal: MS(8),
  },
  contentContainerStyle: {
    paddingTop: MVS(12),
    rowGap: MVS(12),
  },
  itemBTN: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBTNLeftView: {
    flexDirection: 'row',
    columnGap: MS(12),
    flex: 1,
    // backgroundColor: 'pink',
  },
  vehicleIconCont: {
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    width: MS(44),
    height: MS(44),
    borderRadius: 4,
  },
  stringCont: {
    flex: 1,
    rowGap: 2,
    // backgroundColor: 'blue',
  },
  itemTitleString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansSemiBold,
    includeFontPadding: false,
  },
  itemDateString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
  rebookBTN: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: MS(6),
    paddingHorizontal: MS(12),
    borderRadius: 50,
    gap: MS(6),
  },
  rebookString: {
    color: COLORS.white,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
});
