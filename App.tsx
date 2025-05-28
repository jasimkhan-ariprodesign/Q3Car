import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {AppStatusBar} from './src/common';
import {RootNavigator} from './src/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppStatusBar />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
