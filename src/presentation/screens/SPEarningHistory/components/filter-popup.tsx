import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CustomBottomShitModal, IconButton} from '../../../components';
import {COLORS, COMMON_STYLES, MS, WINDOW_HEIGHT} from '../../../../misc';
import {ICONS} from '../../../../assets';

interface FilterPopupProp {
  closePopupFunc?: Function;
}

const FilterPopup: React.FC<FilterPopupProp> = ({closePopupFunc}) => {
  const _handleClosePopupFunc = () => {
    closePopupFunc && closePopupFunc();
  };

  const _renderCloseBTN = () => {
    return (
      <>
        <IconButton
          icon={ICONS.closeBlack}
          onPress={_handleClosePopupFunc}
          disabled={false}
          iconStyle={COMMON_STYLES.size12}
          iconBtnStyle={styles.closeBTN}
        />
      </>
    );
  };

  const _renderContentCont = () => {
    return (
      <>
        <Text>FilterPopup</Text>
      </>
    );
  };

  // main view
  return (
    <CustomBottomShitModal animationValue={50}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={styles.ScrollViewCont}>
          <View style={styles.contentCont}>
            {/* close button */}
            {_renderCloseBTN()}

            {/* content continer */}
            {_renderContentCont()}
          </View>
        </ScrollView>
      </View>
    </CustomBottomShitModal>
  );
};

export default FilterPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ScrollViewCont: {
    // backgroundColor: COLORS.pink,
    padding: MS(18),
    minHeight: WINDOW_HEIGHT * 0.4,
  },
  contentCont: {
    backgroundColor: COLORS.white,
    paddingVertical: MS(24),
    paddingHorizontal: MS(16),
    borderRadius: 16,
  },
  closeBTN: {
    position: 'absolute',
    backgroundColor: COLORS.offWhite,
    padding: MS(6),
    borderRadius: 40,
    right: -MS(10),
    top: -MS(10),
    ...COMMON_STYLES.shadow1,
  },
});
