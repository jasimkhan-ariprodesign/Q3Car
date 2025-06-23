import {GestureResponderEvent, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {_icons} from '../../../../assets';
import {_color, _styles, _vs} from '../../../../misc';
import { _logger } from '../../../../utils';

interface Prop {
  onPress: (event: GestureResponderEvent) => void;
  index: number;
  dataLength: number;
}

const NextButtonWithProgressBar = ({onPress, index, dataLength}: Prop) => {
  const progressPerItem = 100 / dataLength;
  const fillPercentage = Math.min(100, (index + 1) * progressPerItem);

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={90}
        width={4}
        fill={fillPercentage || 0}
        prefill={0}
        rotation={0}
        tintColor={_color.primary}
        backgroundColor={_color.B4B4B4}
        backgroundWidth={4}
        duration={600}
        lineCap="round"
        onAnimationComplete={() => _logger.log('Animation complete')}>
        {(fill: number) => {
          // _logger.log('fill --> ', fill);
          return (
            <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
              <Image source={_icons.arrowRight} style={_styles.size20} />
            </TouchableOpacity>
          );
        }}
      </AnimatedCircularProgress>
    </View>
  );
};

export default NextButtonWithProgressBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: _vs(30),
  },
  buttonStyle: {
    backgroundColor: _color.primary,
    width: 70,
    height: 70,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
