import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, COMMON_STYLES, MS, MVS, WINDOW_HEIGHT} from '../../../../../misc';
import {FONTS, ICONS, IMAGES} from '../../../../../assets';

const ContentCont = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <>
          {/* name, date, price & profile container */}
          <View style={styles.nameAndProfileCont}>
            <View style={styles.nameDatePriceCont}>
              <Text style={styles.nameString}>Andre Clarke</Text>
              <Text style={styles.dateString}>26 Mar-11:20 PM</Text>
              <Text style={styles.dateString}>$20.00</Text>
            </View>

            <View style={styles.profileCont}>
              <Image source={IMAGES.userType} style={styles.profileImage} resizeMode="cover" />
            </View>
          </View>

          {/* pickup, drop details container */}
          <View style={styles.pickupDropDetailsCont}>
            <View style={styles.pickupStringView}>
              <Text style={styles.dateString}>PICK UP</Text>
              <Text style={styles.pickupAddressString}>061 Will Terrace Apt. 812</Text>
            </View>

            <View style={styles.horiLine} />

            <View style={styles.pickupStringView}>
              <Text style={styles.dateString}>Drop off</Text>
              <Text style={styles.pickupAddressString}>7617 Hegmann Landing</Text>
            </View>
          </View>

          {/* rating container */}
          <View style={styles.ratingCont}>
            <View style={[COMMON_STYLES.row, COMMON_STYLES.alignCenter]}>
              <View style={styles.starCont}>
                <Image source={ICONS.starBlack} style={COMMON_STYLES.size18} resizeMode="contain" />
                <Text style={styles.pickupAddressString}>No Rating</Text>
              </View>
              <TouchableOpacity style={styles.ratingBTN}>
                <Text style={styles.ratingString}>Rating</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default ContentCont;

const pad = MS(12);
const marHori = MS(20);

const styles = StyleSheet.create({
  container: {
    height: WINDOW_HEIGHT * 0.56,
    backgroundColor: COLORS.offWhite,
    // borderWidth: 2,
    // borderColor: COLORS.purple,
    marginTop: -MVS(18),
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingVertical: MVS(12),
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
  },

  nameAndProfileCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: marHori,
    marginTop: MVS(16),

    backgroundColor: COLORS.white,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: pad,

    elevation: 1,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
  },
  nameDatePriceCont: {
    flex: 1,
    rowGap: MVS(4),
  },
  nameString: {
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
  },
  dateString: {
    color: COLORS.textPrimary,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
  profileCont: {
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    width: MS(60),
    height: MS(60),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: '99%',
    height: '99%',
    borderRadius: 8,
  },
  pickupDropDetailsCont: {
    backgroundColor: COLORS.white,
    marginHorizontal: marHori,
    marginTop: MVS(4),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    elevation: 1,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
  },

  pickupAddressString: {
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    color: COLORS.black,
    includeFontPadding: false,
  },
  pickupStringView: {
    marginHorizontal: pad,
    paddingVertical: pad,
    rowGap: MVS(4),
  },
  horiLine: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: pad,
  },
  ratingCont: {
    marginHorizontal: marHori,
    paddingVertical: pad / 1.5,
    paddingHorizontal: pad,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    marginTop: MVS(12),
  },
  starCont: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(4),
  },
  ratingBTN: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: MS(6),
    paddingHorizontal: MS(20),
    borderRadius: 40,
  },
  ratingString: {
    color: COLORS.white,
    fontFamily: FONTS.workSansRegular,
    fontSize: MS(12),
    includeFontPadding: false,
  },
});
