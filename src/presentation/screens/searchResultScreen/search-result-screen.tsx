import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {COLORS, MS, MVS, COMMON_STYLES, SCREENS} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader, PrimaryButton} from '../../components';
import {SecondaryLoader} from '../../../common';
import {FONTS, ICONS} from '../../../assets';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types/types';

const SearchResultScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const _handleRequestClick = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.bookingDetailsProcessingInfoScreen,
    });
  };

  //   main view
  return (
    <SafeAreaWrapper>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={COMMON_STYLES.flex}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.nameDateDistCont}>
            <Text style={styles.nameString}>SIFFAT ULLAH SHAH</Text>
            <Text style={styles.dateString}>April 3, 2022 | 8:00 AM</Text>
            <Text style={styles.dateString}>Total Distance : 30 km</Text>
          </View>

          <View style={COMMON_STYLES.row}>
            <Image source={ICONS.fromToDest} style={styles.fromToDestImage} resizeMode="contain" />

            {/* address from to Destination */}
            <View style={COMMON_STYLES.spaceBetween}>
              <Text numberOfLines={1} style={styles.addressesString}>
                Abbaseen House queen road, Estonia...
              </Text>
              <Text numberOfLines={1} style={styles.addressesString}>
                234 kings roads, new city Estonia 345...
              </Text>
            </View>
          </View>

          {/* vehicle detail */}
          <View style={[COMMON_STYLES.row, styles.nameDateDistCont]}>
            <View style={[COMMON_STYLES.flex]}>
              <Text style={styles.labelString}>Vehicle</Text>
              <Text style={styles.vehicleDetailString}>Mercedes</Text>
            </View>
            <View style={[COMMON_STYLES.flex, COMMON_STYLES.center]}>
              <Text style={styles.labelString}>Total seats</Text>
              <Text style={styles.vehicleDetailString}>4</Text>
            </View>
            <View style={[COMMON_STYLES.flex, COMMON_STYLES.alignEnd]}>
              <Text style={styles.labelString}>Estimated</Text>
              <Text style={styles.vehicleDetailString}>$234</Text>
            </View>
          </View>

          {/* request button */}
          <PrimaryButton title="Request" onPress={_handleRequestClick} />
        </ScrollView>

        {/* loader */}
        {/* <SecondaryLoader /> */}
      </View>
    </SafeAreaWrapper>
  );
};

export default SearchResultScreen;

const gapAndMargin = MVS(38);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: MVS(28),
    paddingHorizontal: MS(18),
    rowGap: gapAndMargin,
  },

  nameString: {
    color: COLORS.black,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(16),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  dateString: {
    color: COLORS.black,
    fontFamily: FONTS.workSansMedium,
    fontSize: MS(12),
    includeFontPadding: false,
  },
  nameDateDistCont: {
    gap: MVS(4),
  },

  fromToDestImage: {
    width: MVS(18),
    height: MVS(46),
    marginRight: MS(8),
  },
  addressesString: {
    color: COLORS.textPrimary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
  },
  labelString: {
    color: COLORS.textSecondary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
  },
  vehicleDetailString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
  },
});
