import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {_color, _isIOS, _ms, _mvs, _styles} from '../../../misc';
import {SafeAreaWrapper, PrimaryHeader, PrimaryButton} from '../../components';
import {_fonts} from '../../../assets';
import {_vehicleTypes} from '../../../constant';

const SelectCarType = () => {
  const [towTruck, setTowTruck] = useState<any>();

  const _renderFlatList = () => {
    return (
      <View style={[_styles.flex, styles.flatListCont]}>
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
                <View style={[_styles.flex, styles.spaceBetweenText]}>
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
    <SafeAreaWrapper style={styles.container}>
      <PrimaryHeader />
      <View style={[_styles.flex, styles.spaceBetweenView]}>
        <View style={styles.spaceBetweenText}>
          <Text style={styles.title}>Select Vehicle Type</Text>
          <Text style={styles.desc}>to determine the appropriate towing vehicle</Text>
        </View>

        <View style={_styles.flex}>
          <Text style={styles.requestTowString}>Request Tow</Text>
          {/* tow truck lists */}
          {_renderFlatList()}
        </View>

        <PrimaryButton title="BOOK NOW" buttonStyle={styles.bookNowBTN} />
      </View>
    </SafeAreaWrapper>
  );
};

export default SelectCarType;

const gapAndMargin = _mvs(20);
const bdrWidth = 1.2;

const styles = StyleSheet.create({
  container: {
    rowGap: gapAndMargin,
    paddingHorizontal: _ms(18),
  },
  spaceBetweenView: {
    rowGap: gapAndMargin,
  },
  title: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(16),
    includeFontPadding: false,
  },
  desc: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansMedium,
    fontSize: _ms(12),
    includeFontPadding: false,
    textTransform: 'capitalize',
  },
  requestTowString: {
    color: _color.textPrimary,
    fontFamily: _fonts.workSansSemiBold,
    fontSize: _ms(14),
    includeFontPadding: false,
  },
  spaceBetweenText: {
    rowGap: _mvs(4),
  },

  //   flat list
  flatListCont: {
    marginTop: _mvs(8),
  },
  towBTN: {
    borderWidth: bdrWidth,
    borderColor: _color.transparent,
    backgroundColor: _color.offWhite,
    marginBottom: _mvs(12),
    padding: _ms(8),
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedTowBTN: {
    borderColor: _color.FB4A46,
    backgroundColor: `${_color.FF8C00}0D`,
  },
  itemTitle: {
    color: _color.textPrimary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansMedium,
    includeFontPadding: false,
  },
  itemSubTitle: {
    color: _color.FF8C00,
    fontSize: _ms(10),
    fontFamily: _fonts.workSansRegular,
    includeFontPadding: false,
  },
  itemTimeEstimate: {
    color: _color.textPrimary,
    fontSize: _ms(10),
    fontFamily: _fonts.workSansBold,
    includeFontPadding: false,
  },
  itemIconStyle: {
    width: _ms(120),
    height: _ms(48),
  },
  bookNowBTN: {
    marginBottom: _isIOS() ? _mvs(40) : _mvs(50),
    marginTop: _mvs(8),
  },
});
