import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_fonts, _icons} from '../../../../../assets';
import {_color, _ms, _mvs, _styles} from '../../../../../misc';
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
              <Image source={_icons.circleBlue} style={_styles.size22} resizeMode="contain" />
              <Text style={styles.pickupPointBTNString}>Choose pick up point</Text>
            </TouchableOpacity>

            {/* Choose your destination button */}

            <TouchableOpacity
              onPress={_handleChoosePickUpOrDestinationClick}
              style={styles.pickupPointBTN}
              activeOpacity={0.6}>
              <Image source={_icons.locationRed} style={_styles.size22} resizeMode="contain" />
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
                style={[_styles.size16, styles.selectedBTNIconColor]}
                resizeMode="contain"
                source={_icons.saveGrey}
              />
              <Text style={[styles.addressNameString, styles.selectedAddressNameString]}>Home</Text>
            </TouchableOpacity>

            {/* office button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.addressBTN]}>
              <Image style={[_styles.size16]} resizeMode="contain" source={_icons.saveGrey} />
              <Text style={[styles.addressNameString]}>Office</Text>
            </TouchableOpacity>

            {/* next: (>) button */}

            <TouchableOpacity activeOpacity={0.7} style={[styles.nextBTN]}>
              <Image style={[_styles.size16]} resizeMode="contain" source={_icons.angleRightGrey} />
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
    backgroundColor: _color.white,
    marginTop: -_mvs(24),
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingTop: _mvs(8),
  },
  child: {
    paddingHorizontal: _ms(20),
    paddingVertical: _mvs(16),
    rowGap: _mvs(8),
  },
  pickupAndDestCont: {
    rowGap: _mvs(12),
    justifyContent: 'center',
  },
  titleString: {
    color: _color.black,
    fontSize: _ms(14),
    fontFamily: _fonts.poppinsRegular,
  },

  pickupPointBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: _color.EDEDED,
    padding: _ms(8),
    borderRadius: 20,
    columnGap: _ms(12),
  },
  pickupPointBTNString: {
    color: _color.textPrimary,
    fontSize: _ms(12),
    fontFamily: _fonts.poppinsRegular,
    includeFontPadding: false,
  },
  verticalLine: {
    width: _ms(2),
    height: _mvs(28),
    position: 'absolute',
    left: _ms(8 + 11),
  },

  addressTypeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: _ms(12),
  },
  addressBTN: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: _ms(8),
    borderWidth: 1.5,
    borderColor: _color.EDEDED,
    paddingHorizontal: _ms(16),
    paddingVertical: _ms(6),
    borderRadius: 50,
  },
  selectedAddBTN: {
    backgroundColor: _color.primary,
  },
  selectedBTNIconColor: {
    tintColor: _color.white,
  },
  addressNameString: {
    color: _color.textSecondary,
    fontFamily: _fonts.poppinsRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
  },
  selectedAddressNameString: {
    color: _color.white,
  },
  nextBTN: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: _color.EDEDED,
    width: _ms(34),
    height: _ms(34),
    borderRadius: 50,
  },
});
