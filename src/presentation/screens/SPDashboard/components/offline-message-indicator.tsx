import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FONTS, ICONS} from '../../../../assets';
import {COLORS, COMMON_STYLES, MS, MVS} from '../../../../misc';

const OfflineMessageIndicator = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={ICONS.moon} style={COMMON_STYLES.size36} resizeMode="contain" />
      </View>

      <View>
        <Text style={styles.youAreOfflineString}>You are offline !</Text>
        <Text style={styles.goOnlineString}>Go online to start accepting jobs.</Text>
      </View>
    </View>
  );
};

export default OfflineMessageIndicator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: MS(24),
    columnGap: MS(12),
    paddingVertical: MVS(8),
  },
  youAreOfflineString: {
    color: COLORS.white,
    fontSize: MS(14),
    fontFamily: FONTS.workSansSemiBold,
  },
  goOnlineString: {
    color: COLORS.white,
    fontSize: MS(12),
    fontFamily: FONTS.workSansRegular,
  },
});
