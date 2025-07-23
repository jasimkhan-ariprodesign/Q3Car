import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaWrapper, PrimaryHeader} from '../../components';
import {COLORS, COMMON_STYLES, MS, MVS} from '../../../misc';
import {FONTS, ICONS} from '../../../assets';
import {EarningsHistoryData} from '../../../constant';
import FilterPopup from './components/filter-popup';
import {SecondaryLoader} from '../../../common';

const SPEarningHistory = () => {
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);

  const _handleFilterClick = () => {
    setShowFilterPopup(prev => !prev);
  };

  const _renderFilterButtonCont = () => {
    return (
      <View style={styles.filterBTNConParentView}>
        <View style={styles.allDownArrowIconCon}>
          <Text style={styles.allString}>All</Text>
          <Image source={ICONS.arrowDownBlack} style={styles.downArrowIcon} resizeMode="contain" />
        </View>

        <TouchableOpacity onPress={_handleFilterClick}>
          <Image
            source={ICONS.transactionFilter}
            style={COMMON_STYLES.size16}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item}: any) => {
    return (
      <TouchableOpacity style={styles.itemBTN} activeOpacity={0.9}>
        {/* name first later */}
        <View style={styles.firstLetterCont}>
          <Text style={styles.firstLetter}>G</Text>
        </View>

        <View style={styles.nameDatePriceCont}>
          {/* name, date */}
          <View style={[COMMON_STYLES.flex, COMMON_STYLES.gapMVS4]}>
            <Text style={styles.itemTitle}>{item?.type}</Text>
            <View style={[COMMON_STYLES.row, COMMON_STYLES.alignCenter, COMMON_STYLES.gapMS4]}>
              <Image
                source={ICONS.calenderBlack}
                style={COMMON_STYLES.size12}
                resizeMode="contain"
              />
              <Text style={styles.dateString}>{item?.date}</Text>
            </View>
          </View>

          {/* price */}
          <View>
            <Text>$859</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const _renderEarningHistoryLists = () => {
    return (
      <View style={COMMON_STYLES.flex}>
        <FlatList
          data={EarningsHistoryData || []}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item?.id?.toString() || index?.toString()}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </View>
    );
  };

  const _renderFilterPopup = () => {
    return (
      <>
        <FilterPopup closePopupFunc={_handleFilterClick} />
      </>
    );
  };

  const _renderLoader = () => {
    return (
      <>
        <SecondaryLoader />
      </>
    );
  };

  // main view
  return (
    <SafeAreaWrapper>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={styles.contentCont}>
        {/* filter button */}
        {_renderFilterButtonCont()}

        {/* earning history list */}
        {_renderEarningHistoryLists()}

        {/* loader */}
        {/* {_renderLoader()} */}
      </View>

      {/* filter pop up */}
      {showFilterPopup && _renderFilterPopup()}
    </SafeAreaWrapper>
  );
};

export default SPEarningHistory;

const padHori = MS(18);

const styles = StyleSheet.create({
  contentCont: {
    flex: 1,
    rowGap: MVS(18),
  },
  filterBTNConParentView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: padHori,
    paddingVertical: MVS(8),
    justifyContent: 'space-between',
  },
  allDownArrowIconCon: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(4),
  },
  downArrowIcon: {
    width: MS(8),
    height: MVS(10),
  },
  allString: {
    color: COLORS.black,
    fontSize: MS(12),
    fontFamily: FONTS.poppinsMedium,
    includeFontPadding: false,
  },

  // flatlist style
  contentContainerStyle: {
    paddingHorizontal: padHori,
    rowGap: MVS(8),
  },
  itemBTN: {
    flexDirection: 'row',
    columnGap: MS(12),
  },
  firstLetterCont: {
    backgroundColor: `${COLORS.orange}26`,
    width: MS(40),
    height: MS(40),
    borderRadius: MS(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstLetter: {
    color: COLORS.orange,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
  itemTitle: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
  },
  dateString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
  },
  nameDatePriceCont: {
    flex: 1,
    // backgroundColor: 'lightgreen',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),
    paddingTop: MVS(4),
    paddingBottom: MVS(16),
    borderBottomWidth: 1.6,
    borderColor: COLORS.EDEDED,
  },
});
