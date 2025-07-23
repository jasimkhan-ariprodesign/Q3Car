import React from 'react';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {SafeAreaView, type Edge} from 'react-native-safe-area-context';
import {COLORS} from '../../../misc';

type SafeAreaWrapperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[]; // Make edges optional with default value
  excludeDefaultEdges?: boolean; // Option to disable all edges
};

const DEFAULT_EDGES: Edge[] = Platform.select({
  android: ['top', 'left', 'right', 'bottom'],
  ios: ['top', 'left', 'right', 'bottom'],
  default: ['top', 'left', 'right', 'bottom'],
});

const SafeAreaWrapper = ({
  children,
  style,
  edges = DEFAULT_EDGES,
  excludeDefaultEdges = false,
}: SafeAreaWrapperProps) => {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={excludeDefaultEdges ? [] : edges} // Empty array disables all insets
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
