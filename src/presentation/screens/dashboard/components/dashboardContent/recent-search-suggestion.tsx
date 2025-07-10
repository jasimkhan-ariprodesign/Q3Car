import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FONTS, ICONS} from '../../../../../assets';
import {COLORS, MS, MVS, COMMON_STYLES} from '../../../../../misc';

interface RecentSearchSuggestionProp {
  title: string;
  desc: string;
}

const RecentSearchSuggestion: React.FC<RecentSearchSuggestionProp> = ({title, desc}) => {
  return (
    <View>
      <TouchableOpacity style={styles.BTNStyle}>
        <Image source={ICONS.clockGrey} style={COMMON_STYLES.size22} resizeMode="contain" />
        <View style={styles.stringCont}>
          <Text style={styles.title}>{title || ''}</Text>
          <Text style={styles.descString}>{desc || ''}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecentSearchSuggestion;

const styles = StyleSheet.create({
  BTNStyle: {
    backgroundColor: COLORS.offWhite,
    borderTopWidth: 1,
    borderBottomWidth: 0.2,
    borderColor: COLORS.EDEDED,
    height: MVS(54),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: MS(16),
    columnGap: MS(16),
  },
  title: {
    color: COLORS.black,
    fontFamily: FONTS.poppinsRegular,
    fontSize: MS(14),
    includeFontPadding: false,
  },
  descString: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.poppinsRegular,
    fontSize: MS(12),
    includeFontPadding: false,
  },
  stringCont: {
    rowGap: MVS(1),
  },
});
