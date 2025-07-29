import { Platform, Alert, Linking } from 'react-native';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { logger } from '..';

export const locationPermission = async () => {
  try {
    const permission =
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    const granted = await request(permission);

    if (granted !== RESULTS.GRANTED) {
      Alert.alert('Permission Denied', 'Location permission is required.', [
        {
          text: 'Go to Settings',
          onPress: () => Linking.openSettings(),
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
      return false;
    }

    if (Platform.OS === 'android') {
      const isEnabled = await isLocationEnabled();
      if (!isEnabled) {
        const enableResult = await promptForEnableLocationIfNeeded();
        if (!enableResult) {
          Alert.alert('Location Services Disabled', 'Please enable location services to use the map.');
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    logger.log('Error requesting permissions or checking location:', error);
    Alert.alert('Error', 'Unable to access location. Please try again.');
    return false;
  }
};
