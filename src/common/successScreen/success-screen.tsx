import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaWrapper} from '../../presentation/components';
import {_fonts, _icons} from '../../assets';
import {_color, _ms, _mvs, _styles} from '../../misc';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/types/types';
import {_logger} from '../../utils';

const SuccessScreen = () => {
  const route = useRoute<RouteProp<AppStackParamList, 'SuccessScreen'>>();
  const {successMsg} = route?.params || {};
  _logger.log('successMsg ->', successMsg);

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.contentCont}>
        <Image source={_icons.succeccCheck} style={_styles.size82} />
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
    rowGap: _mvs(4),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -_mvs(28),
  },
  Congratulations: {
    color: _color.primary,
    fontSize: _ms(20),
    fontFamily: _fonts.workSansRegular,
  },
  messageString: {
    color: _color.textSecondary,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansRegular,
  },
});
