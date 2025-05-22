import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StackNavigation} from './src/presentation';
import {NavigationContainer} from '@react-navigation/native';
import {AppStatusBar} from './src/common';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStatusBar />
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
