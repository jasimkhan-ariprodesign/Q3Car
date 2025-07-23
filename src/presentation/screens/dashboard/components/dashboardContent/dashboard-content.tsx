import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, ICONS} from '../../../../../assets';
import {COLORS, MS, MVS, COMMON_STYLES} from '../../../../../misc';
import RecentSearchSuggestion from './recent-search-suggestion';

interface DashboardContentProp {
  _handleSearchClick?: Function;
}

const DashboardContent: React.FC<DashboardContentProp> = ({_handleSearchClick}) => {
  const _handleChoosePickUpOrDestinationClick = () => {
    _handleSearchClick && _handleSearchClick();
  };

  const _renderRecentSearchSuggestion = () => {
    return (
      <>
        <RecentSearchSuggestion
          title={'Steak Restaurant'}
          desc={'8 Norman St, East Sydney, NSW 2010'}
        />

        <RecentSearchSuggestion
          title={'Melbourne Park'}
          desc={'127 Station St, Port Melbourne, VIC 3207'}
        />
      </>
    );
  };

  return (
    <View style={styles.contentContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.child}>
          <Text style={styles.titleString}>Where are you going today?</Text>

          <View style={styles.pickupAndDestCont}>
            {/* pick up point button */}

            <TouchableOpacity
              onPress={_handleChoosePickUpOrDestinationClick}
              style={styles.pickupPointBTN}
              activeOpacity={0.6}>
              <Image source={ICONS.circleBlue} style={COMMON_STYLES.size22} resizeMode="contain" />
              <Text style={styles.pickupPointBTNString}>Choose pick up point</Text>
            </TouchableOpacity>

            {/* Choose your destination button */}

            <TouchableOpacity
              onPress={_handleChoosePickUpOrDestinationClick}
              style={styles.pickupPointBTN}
              activeOpacity={0.6}>
              <Image source={ICONS.locationRed} style={COMMON_STYLES.size22} resizeMode="contain" />
              <Text style={styles.pickupPointBTNString}>Choose your destination</Text>
            </TouchableOpacity>

            {/* vertical line - image */}
            <Image source={ICONS.verticalLine} style={styles.verticalLine} resizeMode="cover" />
          </View>

          {/* address type buttons */}
          <View style={styles.addressTypeCont}>
            {/* home button */}

            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.addressBTN, styles.selectedAddBTN]}>
              <Image
                style={[COMMON_STYLES.size16, styles.selectedBTNIconColor]}
                resizeMode="contain"
                source={ICONS.saveGrey}
              />
              <Text style={[styles.addressNameString, styles.selectedAddressNameString]}>Home</Text>
            </TouchableOpacity>

            {/* office button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.addressBTN]}>
              <Image style={[COMMON_STYLES.size16]} resizeMode="contain" source={ICONS.saveGrey} />
              <Text style={[styles.addressNameString]}>Office</Text>
            </TouchableOpacity>

            {/* next: (>) button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.nextBTN]}>
              <Image style={[COMMON_STYLES.size16]} resizeMode="contain" source={ICONS.angleRightGrey} />
            </TouchableOpacity>
          </View>
        </View>

        {/* recent search suggestion cont */}

        {_renderRecentSearchSuggestion()}
      </ScrollView>
    </View>
  );
};

export default DashboardContent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -MVS(24),
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: MVS(8),
  },
  child: {
    paddingHorizontal: MS(20),
    paddingVertical: MVS(16),
    rowGap: MVS(8),
  },
  pickupAndDestCont: {
    rowGap: MVS(12),
    justifyContent: 'center',
  },
  titleString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.poppinsRegular,
  },

  pickupPointBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: COLORS.EDEDED,
    padding: MS(8),
    borderRadius: 20,
    columnGap: MS(12),
  },
  pickupPointBTNString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.poppinsRegular,
    includeFontPadding: false,
  },
  verticalLine: {
    width: MS(2),
    height: MVS(28),
    position: 'absolute',
    left: MS(8 + 11),
  },

  addressTypeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(12),
  },
  addressBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: MS(8),
    borderWidth: 1.5,
    borderColor: COLORS.EDEDED,
    paddingHorizontal: MS(16),
    paddingVertical: MS(6),
    borderRadius: 50,
  },
  selectedAddBTN: {
    backgroundColor: COLORS.primary,
  },
  selectedBTNIconColor: {
    tintColor: COLORS.white,
  },
  addressNameString: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.poppinsRegular,
    fontSize: MS(12),
    includeFontPadding: false,
  },
  selectedAddressNameString: {
    color: COLORS.white,
  },
  nextBTN: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.EDEDED,
    width: MS(34),
    height: MS(34),
    borderRadius: 50,
  },
});
