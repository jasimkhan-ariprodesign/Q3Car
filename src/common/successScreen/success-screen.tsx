import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper} from '../../presentation/components';
import {FONTS, ICONS} from '../../assets';
import {COLORS, MS, MVS, COMMON_STYLES} from '../../misc';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/types/types';
import {logger} from '../../utils';

const SuccessScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'SuccessScreen'>>();
  const {successMsg} = route?.params || {};
  logger.log('successMsg ->', successMsg);

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.contentCont}>
        <Image source={ICONS.succeccCheck} style={COMMON_STYLES.size82} />
        <Text style={styles.Congratulations}>Congratulations!</Text>
        <Text style={styles.messageString}>{successMsg || ''}</Text>
      </View>
    </SafeAreaWrapper>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentCont: {
    rowGap: MVS(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -MVS(28),
  },
  Congratulations: {
    color: COLORS.primary,
    fontSize: MS(20),
    fontFamily: FONTS.workSansRegular,
  },
  messageString: {
    color: COLORS.textSecondary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
  },
});
