import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {_color} from '../../../../../../../misc/colors';
import {EdgeInsets} from 'react-native-safe-area-context';
import {_ms, _mvs, _useCustomSafeAreaInsets} from '../../../../../../../misc';
import {_fonts} from '../../../../../../../assets';

const BookingProcessingComponent = () => {
  const insets = _useCustomSafeAreaInsets();
  const styles = getStyles(insets);

  const _renderLoaderAndBookingStatusString = () => {
    return (
      <View style={styles.loaderAndMsgCont}>
        <ActivityIndicator color={_color.primary} size={'large'} />
        <Text style={styles.processingMSGString}>We are processing your booking...</Text>
        <Text style={styles.staticMsgString}>Your ride will start soon</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* booking process loader */}
      {_renderLoaderAndBookingStatusString()}
    </View>
  );
};

export default BookingProcessingComponent;

const getStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      backgroundColor: _color.white,
      height: WINDOW_HEIGHT * 0.24,
      width: '100%',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginTop: -_mvs(16),
      borderWidth: 2,
      borderColor: 'lime',
      paddingBottom: insets?.bottom || _mvs(16),
      paddingTop: _mvs(16),
    },
    loaderAndMsgCont: {
      alignItems: 'center',
      rowGap: _mvs(12),
    },
    processingMSGString: {
      color: _color.textPrimary,
      fontSize: _ms(14),
      fontFamily: _fonts.workSansBold,
      includeFontPadding: false,
      textTransform: 'uppercase',
    },
    staticMsgString: {
      color: _color.textPrimary,
      fontSize: _ms(12),
      fontFamily: _fonts.workSansRegular,
      includeFontPadding: false,
    },
  });
