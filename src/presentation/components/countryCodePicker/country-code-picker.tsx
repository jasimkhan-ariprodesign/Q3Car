import React from 'react';
import { Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BottomSheetBackdropProps, BottomSheetFlatList, BottomSheetModal, SNAP_POINT_TYPE } from '@gorhom/bottom-sheet';
import { COLORS, COMMON_STYLES, MS, MVS } from '../../../misc';
import { FONTS, ICONS } from '../../../assets';
import { COUNTRY_CODE } from '../../../constant';
import { IconButton } from '../../components';

interface SearchSheetProp {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  handleSheetChanges?: (index: number, position: number, type: SNAP_POINT_TYPE) => void;
  setDialCode?: (dial_code: string) => void;
}

const CountryCodePicker: React.FC<SearchSheetProp> = ({ bottomSheetModalRef, handleSheetChanges, setDialCode }) => {
  const [searchText, setSearchText] = React.useState('');

  const filterCountries = (data: typeof COUNTRY_CODE, query: string) => {
    if (!query?.trim()) return data;

    const formattedQuery = query.trim().toLowerCase();

    return data.filter(country => {
      const nameMatch = country.name.toLowerCase().includes(formattedQuery);
      const codeMatch = country.dial_code?.toLowerCase().includes(formattedQuery);
      return nameMatch || codeMatch;
    });
  };

  const _handleCloseBottomSheet = () => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.close();
  };

  const _renderBackdropComponent = ({ style }: BottomSheetBackdropProps) => {
    return <Pressable style={[style, { backgroundColor: COLORS.transparentBlack5 }]} onPress={_handleCloseBottomSheet} />;
  };

  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.dial_code) {
            setDialCode && setDialCode(item?.dial_code || '');
          }
        }}
        style={styles.listBTN}
      >
        <Text style={styles.flag}>{item?.emoji || ''}</Text>
        <Text style={styles.listString}>{item?.name || ''}</Text>
        <Text style={styles.listString}>{(item?.dial_code && `(${item?.dial_code})`) || ''}</Text>
      </TouchableOpacity>
    );
  };

  //   main view
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges ? handleSheetChanges : undefined}
      snapPoints={['90%']}
      enablePanDownToClose={true}
      enableOverDrag={true}
      backdropComponent={_renderBackdropComponent}
      animationConfigs={{ duration: 150 }}
      enableDismissOnClose
      handleIndicatorStyle={styles.indicatorStyle}
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior="none"
      enableDynamicSizing={false}
    >
      <View style={styles.contentContainer}>
        <View style={styles.inputCont}>
          <TextInput
            placeholder="Search your country"
            placeholderTextColor={COLORS.textPrimary}
            style={styles.inputStyle}
            value={searchText}
            onChangeText={setSearchText}
          />
          <IconButton
            icon={ICONS.closeBlack}
            iconStyle={COMMON_STYLES.size14}
            onPress={_handleCloseBottomSheet}
            disabled={false}
          />
        </View>
        <BottomSheetFlatList
          data={filterCountries(COUNTRY_CODE, searchText) || []}
          renderItem={_renderItem}
          keyExtractor={(item, index) => `${item?.name}${item?.dial_code}_${index}`}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          scrollEnabled
          style={styles.flatlistStyle}
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </BottomSheetModal>
  );
};

export default CountryCodePicker;

const styles = StyleSheet.create({
  indicatorStyle: {
    backgroundColor: COLORS.gray,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.white,
    paddingHorizontal: MS(20),
    paddingTop: MVS(4),
  },
  inputCont: {
    flexDirection: 'row',
    columnGap: MS(16),
    alignItems: 'center',
  },
  inputStyle: {
    padding: 0,
    backgroundColor: COLORS.offWhite,
    flex: 1,
    paddingLeft: MS(12),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.EDEDED,
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
    includeFontPadding: false,
    textAlignVertical: 'center',
    height: MVS(36),
  },
  flatlistStyle: {
    marginVertical: MVS(12),
  },
  contentContainerStyle: {
    paddingBottom: MVS(16),
    rowGap: MVS(8),
  },
  listBTN: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(12),
    paddingVertical: MVS(4),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.EDEDED,
    paddingHorizontal: MS(12),
  },
  listString: {
    color: COLORS.black,
    fontSize: MS(12),
    fontWeight: '500',
    includeFontPadding: false,
  },
  flag: {
    fontSize: MS(20),
  },
});
