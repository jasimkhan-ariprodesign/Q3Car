import {StyleSheet, View} from 'react-native';
import React from 'react';
import {StackNavigation} from './src/presentation';
import {NavigationContainer} from '@react-navigation/native';
import {AppStatusBar} from './src/common';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <AppStatusBar />
        <StackNavigation />
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
