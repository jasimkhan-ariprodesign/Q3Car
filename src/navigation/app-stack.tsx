import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {AppStackParamList} from './types/types';
import {COLORS, SCREENS} from '../misc';
import {SuccessScreen} from '../common';
import {
  BookingDetailsProcessingInfoScreen,
  HistoryDetailsScreen,
  HistoryScreen,
  ProfileScreen,
  SearchResultScreen,
  SearchScreen,
  SelectCarType,
  UploadPictureOfVehicle,
} from '../presentation';

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

      {/* drawer screens */}
      <Stack.Screen name={SCREENS.profileScreen} component={ProfileScreen} />
      <Stack.Screen name={SCREENS.historyScreen} component={HistoryScreen} />

      <Stack.Group>
        <Stack.Screen name={SCREENS.searchScreen} component={SearchScreen} />
      </Stack.Group>

      <Stack.Screen name={SCREENS.selectCarType} component={SelectCarType} />
      <Stack.Screen name={SCREENS.uploadPictureOfVehicle} component={UploadPictureOfVehicle} />
      <Stack.Screen name={SCREENS.searchResultScreen} component={SearchResultScreen} />
      <Stack.Screen
        name={SCREENS.bookingDetailsProcessingInfoScreen}
        component={BookingDetailsProcessingInfoScreen}
      />
      <Stack.Screen name={SCREENS.historyDetailsScreen} component={HistoryDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
