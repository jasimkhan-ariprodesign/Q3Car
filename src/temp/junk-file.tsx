import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
