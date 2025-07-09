import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, isIOS, ms, mvs, SCREENS, COMMON_STYLES} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader, PrimaryButton} from '../../components';
import {_fonts} from '../../../assets';
import {_vehicleTypes} from '../../../constant';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation/types/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {SecondaryLoader} from '../../../common';

const SelectCarType = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [towTruck, setTowTruck] = useState<any>();

  const _handleBookNowClick = () => {
    navigation.push(SCREENS.appStack, {
      screen: SCREENS.uploadPictureOfVehicle,
    });
  };

  const _renderFlatList = () => {
    return (
      <View style={[COMMON_STYLES.flex, styles.flatListCont]}>
        <FlatList
          data={_vehicleTypes}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => setTowTruck(item)}
                style={[
                  styles.towBTN,
                  towTruck?.id === item?.id ? styles.selectedTowBTN : undefined,
                ]}>
                <View style={[COMMON_STYLES.flex, styles.spaceBetweenText]}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemSubTitle}>{item.subtitle}</Text>
                  <Text style={styles.itemTimeEstimate}>{item.timeEstimate}</Text>
                </View>

                <View>
                  <Image source={item?.image} style={styles.itemIconStyle} resizeMode="contain" />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaWrapper style={COMMON_STYLES.flex}>
      <PrimaryHeader containerStyle={COMMON_STYLES.headerStyle} />
      <View style={COMMON_STYLES.flex}>
        <View style={[COMMON_STYLES.flex, styles.spaceBetweenView]}>
          <View style={styles.spaceBetweenText}>
            <Text style={styles.title}>Select Vehicle Type</Text>
            <Text style={styles.desc}>to determine the appropriate towing vehicle</Text>
          </View>

          <View style={COMMON_STYLES.flex}>
            <Text style={styles.requestTowString}>Request Tow</Text>
            {/* tow truck lists */}
            {_renderFlatList()}
          </View>

          <PrimaryButton
            title="BOOK NOW"
            buttonStyle={styles.bookNowBTN}
            onPress={_handleBookNowClick}
          />
        </View>
        {/* loader */}
        {/* <SecondaryLoader /> */}
      </View>
    </SafeAreaWrapper>
  );
};

export default SelectCarType;

const gapAndMargin = mvs(20);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  spaceBetweenView: {
    rowGap: gapAndMargin,
    paddingHorizontal: ms(18),
    paddingTop: mvs(12),
  },
  title: {
    color: COLORS.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: ms(16),
    includeFontPadding: false,
  },
  desc: {
    color: COLORS.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: ms(12),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  requestTowString: {
    color: COLORS.textPrimary,
    fontFamily: _fonts.workSansSemiBold,
    fontSize: ms(14),
    includeFontPadding: false,
  },
  spaceBetweenText: {
    rowGap: mvs(4),
  },

  //   flat list
  flatListCont: {
    marginTop: mvs(8),
  },
  towBTN: {
    borderWidth: bdrWidth,
    borderColor: COLORS.transparent,
    backgroundColor: COLORS.offWhite,
    marginBottom: mvs(12),
    padding: ms(8),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTowBTN: {
    borderColor: COLORS.FB4A46,
    backgroundColor: `${COLORS.FF8C00}0D`,
  },
  itemTitle: {
    color: COLORS.textPrimary,
    fontSize: ms(14),
    fontFamily: _fonts.workSansMedium,
    includeFontPadding: false,
  },
  itemSubTitle: {
    color: COLORS.FF8C00,
    fontSize: ms(10),
    fontFamily: _fonts.workSansRegular,
    includeFontPadding: false,
  },
  itemTimeEstimate: {
    color: COLORS.textPrimary,
    fontSize: ms(10),
    fontFamily: _fonts.workSansBold,
    includeFontPadding: false,
  },
  itemIconStyle: {
    width: ms(120),
    height: ms(48),
  },
  bookNowBTN: {
    marginBottom: isIOS() ? mvs(40) : mvs(50),
    marginTop: mvs(8),
  },
});
