import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './types/types';
import {COLORS, SCREENS} from '../misc';
import {SuccessScreen} from '../common';
import {BookingDetailsProcessingInfoScreen, ProfileScreen, SearchResultScreen, SearchScreen, SelectCarType, UploadPictureOfVehicle} from '../presentation';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.successScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: COLORS?.white},
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name={SCREENS.successScreen} component={SuccessScreen} />
      <Stack.Screen name={SCREENS.profileScreen} component={ProfileScreen} />

      <Stack.Group>
        <Stack.Screen name={SCREENS.searchScreen} component={SearchScreen} />
      </Stack.Group>
      <Stack.Screen name={SCREENS.selectCarType} component={SelectCarType} />
      <Stack.Screen name={SCREENS.uploadPictureOfVehicle} component={UploadPictureOfVehicle} />
      <Stack.Screen name={SCREENS.searchResultScreen} component={SearchResultScreen} />
      <Stack.Screen name={SCREENS.bookingDetailsProcessingInfoScreen} component={BookingDetailsProcessingInfoScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
