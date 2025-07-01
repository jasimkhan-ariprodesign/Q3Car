import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {_fonts, _icons} from '../../../../../assets';
import {_color, _ms, _mvs, _styles} from '../../../../../misc';

interface RecentSearchSuggestionProp {
  title: string;
  desc: string;
}

const RecentSearchSuggestion: React.FC<RecentSearchSuggestionProp> = ({title, desc}) => {
  return (
    <View>
      <TouchableOpacity style={styles.BTNStyle}>
        <Image source={_icons.clockGrey} style={_styles.size22} resizeMode="contain" />
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
    backgroundColor: _color.offWhite,
    borderTopWidth: 1,
    borderBottomWidth: 0.2,
    borderColor: _color.EDEDED,
    height: _mvs(54),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: _ms(16),
    columnGap: _ms(16),
  },
  title: {
    color: _color.black,
    fontFamily: _fonts.poppinsRegular,
    fontSize: _ms(14),
    includeFontPadding: false,
  },
  descString: {
    color: _color.textSecondary,
    fontFamily: _fonts.poppinsRegular,
    fontSize: _ms(12),
    includeFontPadding: false,
  },
  stringCont: {
    rowGap: _mvs(1),
  },
});
