import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './types/types';
import {_color, _screens} from '../misc';
import {SuccessScreen} from '../common';
import {ProfileScreen, SearchResultScreen, SearchScreen, SelectCarType, UploadPictureOfVehicle} from '../presentation';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={_screens.successScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: _color?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={_screens.successScreen} component={SuccessScreen} />
      <Stack.Screen name={_screens.profileScreen} component={ProfileScreen} />

      <Stack.Group>
        <Stack.Screen name={_screens.searchScreen} component={SearchScreen} />
      </Stack.Group>
      <Stack.Screen name={_screens.selectCarType} component={SelectCarType} />
      <Stack.Screen name={_screens.uploadPictureOfVehicle} component={UploadPictureOfVehicle} />
      <Stack.Screen name={_screens.searchResultScreen} component={SearchResultScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
