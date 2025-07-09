import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_fonts, _icons} from '../../../../../assets';
import {COLORS, ms, mvs, COMMON_STYLES} from '../../../../../misc';
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
              <Image source={_icons.circleBlue} style={COMMON_STYLES.size22} resizeMode="contain" />
              <Text style={styles.pickupPointBTNString}>Choose pick up point</Text>
            </TouchableOpacity>

            {/* Choose your destination button */}

            <TouchableOpacity
              onPress={_handleChoosePickUpOrDestinationClick}
              style={styles.pickupPointBTN}
              activeOpacity={0.6}>
              <Image source={_icons.locationRed} style={COMMON_STYLES.size22} resizeMode="contain" />
              <Text style={styles.pickupPointBTNString}>Choose your destination</Text>
            </TouchableOpacity>

            {/* vertical line - image */}
            <Image source={_icons.verticalLine} style={styles.verticalLine} resizeMode="cover" />
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
                source={_icons.saveGrey}
              />
              <Text style={[styles.addressNameString, styles.selectedAddressNameString]}>Home</Text>
            </TouchableOpacity>

            {/* office button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.addressBTN]}>
              <Image style={[COMMON_STYLES.size16]} resizeMode="contain" source={_icons.saveGrey} />
              <Text style={[styles.addressNameString]}>Office</Text>
            </TouchableOpacity>

            {/* next: (>) button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.nextBTN]}>
              <Image style={[COMMON_STYLES.size16]} resizeMode="contain" source={_icons.angleRightGrey} />
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
    marginTop: -mvs(24),
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: mvs(8),
  },
  child: {
    paddingHorizontal: ms(20),
    paddingVertical: mvs(16),
    rowGap: mvs(8),
  },
  pickupAndDestCont: {
    rowGap: mvs(12),
    justifyContent: 'center',
  },
  titleString: {
    color: COLORS.black,
    fontSize: ms(14),
    fontFamily: _fonts.poppinsRegular,
  },

  pickupPointBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: COLORS.EDEDED,
    padding: ms(8),
    borderRadius: 20,
    columnGap: ms(12),
  },
  pickupPointBTNString: {
    color: COLORS.textPrimary,
    fontSize: ms(12),
    fontFamily: _fonts.poppinsRegular,
    includeFontPadding: false,
  },
  verticalLine: {
    width: ms(2),
    height: mvs(28),
    position: 'absolute',
    left: ms(8 + 11),
  },

  addressTypeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: ms(12),
  },
  addressBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ms(8),
    borderWidth: 1.5,
    borderColor: COLORS.EDEDED,
    paddingHorizontal: ms(16),
    paddingVertical: ms(6),
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
    fontFamily: _fonts.poppinsRegular,
    fontSize: ms(12),
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
    width: ms(34),
    height: ms(34),
    borderRadius: 50,
  },
});
