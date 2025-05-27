import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Svg, {Circle} from 'react-native-svg';

const SIZE = 80; // Button size
const STROKE_WIDTH = 5;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircularButton = ({progress = 0.75, label = '→'}) => {
  const strokeDashoffset = CIRCUMFERENCE - CIRCUMFERENCE * progress;
  console.log('strokeDashoffset -->', strokeDashoffset);

  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <AnimatedCircularProgress
        size={120}
        width={15}
        prefill={0}
        rotation={0}
        fill={25}
        tintColor="#00e0ff"
        backgroundColor="#3d5875"
        duration={1000} // Animation duration in ms
        onAnimationComplete={() => console.warn('Animation complete')}
      />

      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        {/* Gray Background Circle */}
        <Circle
          stroke="#ccc"
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        {/* Red Progress Circle */}
        <Circle
          stroke="red"
          fill="none"
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
        />
      </Svg>

      <View style={styles.innerCircle}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <CircularButton progress={0.33} label="→" />
      <CircularButton progress={0.66} label="→" />
      <CircularButton progress={1} label="Go" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: SIZE - 15,
    height: SIZE - 15,
    borderRadius: (SIZE - 15) / 2,
    backgroundColor: '#174ea6', // Blue center
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;

//  ------------------------ --------------------------------------- -------------
// import * as React from 'react';
// import {Easing, TextInput, Animated, Text, View, StyleSheet} from 'react-native';
// import Svg, {G, Circle, Rect} from 'react-native-svg';
// const data = [
//   {
//     percentage: 55,
//     color: 'tomato',
//   },
//   {
//     percentage: 22,
//     color: 'skyblue',
//   },
//   {
//     percentage: 92,
//     color: 'gold',
//   },
//   {
//     percentage: 12,
//     color: '#222',
//   },
// ];

// const AnimatedRect = Animated.createAnimatedComponent(Rect);
// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// function Donut({
//   percentage = 75,
//   radius = 40,
//   strokeWidth = 10,
//   duration = 500,
//   color = 'tomato',
//   delay = 0,
// }) {
//   const animated = React.useRef(new Animated.Value(0)).current;
//   const rectRef = React.useRef();
//   const inputRef = React.useRef();
//   const circumference = 2 * Math.PI * radius;

//   const animation = toValue => {
//     return Animated.timing(animated, {
//       delay,
//       toValue,
//       duration,
//       useNativeDriver: true,
//       easing: Easing.out(Easing.ease),
//     }).start(() => {
//       // animation(toValue === 0 ? percentage : 0);
//     });
//   };

//   React.useEffect(() => {
//     animation(percentage);
//     animated.addListener(v => {
//       // console.log(v.value)
//       const strokeDashoffset = circumference - (circumference * v.value) / 100;
//       // console.log(v.value)
//       if (inputRef?.current) {
//         inputRef.current.setNativeProps({
//           text: Math.round(v.value).toString(),
//         });
//       }
//       if (rectRef?.current) {
//         rectRef.current.setNativeProps({
//           strokeDashoffset,
//         });
//       }
//     });

//     return () => {
//       animated.removeAllListeners();
//     };
//   });

//   return (
//     <View style={{width: radius * 2, height: radius * 2}}>
//       <Svg
//         height={radius * 2}
//         width={radius * 2}
//         viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}>
//         <G rotation="-90" origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}>
//           <Circle
//             ref={rectRef}
//             cx="50%"
//             cy="50%"
//             r={radius}
//             strokeDashoffset={circumference}
//             fill="transparent"
//             stroke={color}
//             strokeWidth={strokeWidth}
//             strokeLinecap="round"
//             strokeDasharray={circumference}
//           />
//           <Circle
//             cx="50%"
//             cy="50%"
//             r={radius}
//             fill="transparent"
//             stroke={color}
//             strokeWidth={strokeWidth}
//             strokeLinejoin="round"
//             strokeOpacity=".2"
//           />
//         </G>
//       </Svg>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-evenly',
//           flexWrap: 'wrap',
//           alignItems: 'center',
//         }}>
//         {data.map((p, i) => {
//           return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} />;
//         })}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
