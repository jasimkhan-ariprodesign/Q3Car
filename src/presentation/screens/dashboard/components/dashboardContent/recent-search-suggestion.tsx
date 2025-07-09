import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_fonts, _icons} from '../../../../../assets';
import {COLORS, ms, mvs, COMMON_STYLES} from '../../../../../misc';

interface RecentSearchSuggestionProp {
  title: string;
  desc: string;
}

const RecentSearchSuggestion: React.FC<RecentSearchSuggestionProp> = ({title, desc}) => {
  return (
    <View>
      <TouchableOpacity style={styles.BTNStyle}>
        <Image source={_icons.clockGrey} style={COMMON_STYLES.size22} resizeMode="contain" />
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
    height: mvs(54),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ms(16),
    columnGap: ms(16),
  },
  title: {
    color: COLORS.black,
    fontFamily: _fonts.poppinsRegular,
    fontSize: ms(14),
    includeFontPadding: false,
  },
  descString: {
    color: COLORS.textSecondary,
    fontFamily: _fonts.poppinsRegular,
    fontSize: ms(12),
    includeFontPadding: false,
  },
  stringCont: {
    rowGap: mvs(1),
  },
});
