import {View, StyleSheet, ViewStyle, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {COLORS} from '../../../misc';

interface CustomBottomShitModalProps {
  containerStyle?: ViewStyle;
  backdropStyle?: ViewStyle;
  animationValue?: number;
  children?: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

const CustomBottomShitModal: React.FC<CustomBottomShitModalProps> = ({
  containerStyle,
  backdropStyle,
  children,
  animationValue = 300,
  contentContainerStyle,
}) => {
  const animation = useRef(new Animated.Value(animationValue)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.backdrop, backdropStyle]} />
      <Animated.View
        style={[
          styles.contentContainer,
          contentContainerStyle,
          {
            transform: [
              {
                translateY: animation,
              },
            ],
          },
        ]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default CustomBottomShitModal;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.black,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
