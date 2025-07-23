// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   PanResponder,
//   Animated,
//   Dimensions,
//   I18nManager,
//   Alert,
// } from 'react-native';

// // Constants
// const {width} = Dimensions.get('window');
// const SLIDER_WIDTH = width * 0.85;
// const SLIDER_HEIGHT = 60;
// const THUMB_SIZE = 50;
// const SLIDE_SUCCESS_THRESHOLD = SLIDER_WIDTH - THUMB_SIZE - 10;

// // Main Screen or Usage Component
// const SlideToCancelScreen = () => {
//   const handleSlideSuccess = () => {
//     Alert.alert('Cancelled', 'You have successfully cancelled the action!');
//   };

//   return (
//     <View style={styles.screen}>
//       <Text style={styles.heading}>Slide the button to cancel</Text>
//       <SlideToCancel onSlideSuccess={handleSlideSuccess} />
//     </View>
//   );
// };

// // SlideToCancel Component
// const SlideToCancel = ({onSlideSuccess}: {onSlideSuccess: () => void}) => {
//   const translateX = useRef(new Animated.Value(0)).current;
//   const [completed, setCompleted] = useState(false);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => !completed,
//       onPanResponderMove: (_, gestureState) => {
//         const dx = I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
//         if (dx >= 0 && dx <= SLIDER_WIDTH - THUMB_SIZE) {
//           translateX.setValue(dx);
//         }
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const dx = I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
//         if (dx > SLIDE_SUCCESS_THRESHOLD) {
//           Animated.timing(translateX, {
//             toValue: SLIDER_WIDTH - THUMB_SIZE,
//             duration: 150,
//             useNativeDriver: true,
//           }).start(() => {
//             setCompleted(true);
//             onSlideSuccess();
//           });
//         } else {
//           Animated.spring(translateX, {
//             toValue: 0,
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     }),
//   ).current;

//   return (
//     <View style={styles.container}>
//       <View style={styles.slider}>
//         <Text style={styles.label}>SLIDE TO CANCEL</Text>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[
//             styles.thumb,
//             {
//               transform: [{translateX}],
//             },
//           ]}>
//           <Text style={styles.thumbText}>✕</Text>
//         </Animated.View>
//       </View>
//     </View>
//   );
// };

// export default SlideToCancelScreen;

// // Styles
// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 30,
//     color: '#333',
//   },
//   container: {
//     alignItems: 'center',
//   },
//   slider: {
//     width: SLIDER_WIDTH,
//     height: SLIDER_HEIGHT,
//     backgroundColor: '#3B65A0',
//     borderRadius: SLIDER_HEIGHT / 2,
//     justifyContent: 'center',
//     overflow: 'hidden',
//   },
//   label: {
//     position: 'absolute',
//     alignSelf: 'center',
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//     zIndex: 0,
//   },
//   thumb: {
//     width: THUMB_SIZE,
//     height: THUMB_SIZE,
//     borderRadius: THUMB_SIZE / 2,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//     position: 'absolute',
//     left: 0,
//   },
//   thumbText: {
//     fontSize: 20,
//     color: '#8c9aad',
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import { ICONS } from '../assets';
import { COMMON_STYLES } from '../misc';
import { IconButton } from '../presentation/components';
import { logger } from '../utils';

const SliderButton = () => {
  const END_POSITION = Dimensions.get('screen').width - 90; // Calculating button width
  const onLeft = useSharedValue(true);
  const position = useSharedValue(0);
  logger.log('onLeft ->', JSON.stringify(onLeft, null, 2));
  const panGesture = Gesture.Pan() // Defining gesture type to Pan
    .runOnJS(true) // This is required if you want to trigger a function on swipe
    .onUpdate(e => {
      if (onLeft.value) {
        position.value = e.translationX;
        logger.log('---=>', (position.value = e.translationX));
      } else {
        position.value = END_POSITION + e.translationX;
      }
    })
    .onEnd(e => {
      if (position.value > END_POSITION / 1.5) {
        // This is the snap point, adjust 1.5 accordingly
        position.value = withTiming(END_POSITION, {duration: 100});
        onLeft.value = false;
        // onSlideCompleted();  You can call any function here when swipe is completed
      } else {
        position.value = withTiming(0, {duration: 100});
        onLeft.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: position.value}],
  }));

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderText}>Swipe To Raise The Alert</Text>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.swipeBtn, animatedStyle]}>
          <IconButton icon={ICONS.circleBlue} iconStyle={COMMON_STYLES.size18} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default SliderButton;

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#E64040',
    position: 'relative',
    height: 50,
    overflow: 'hidden',
    borderRadius: 50,
  },
  sliderText: {
    color: '#fff',
    fontSize: 18,
  },
  swipeBtn: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
