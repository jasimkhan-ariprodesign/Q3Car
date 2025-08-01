import { Platform, Alert, Linking } from 'react-native';
import { isLocationEnabled, promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { logger } from '..';

export const locationPermission = async (): Promise<boolean> => {
  try {
    const permissionType = Platform.select({
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    });

    if (!permissionType) {
      logger.log('permission not found')
      return false;
    }

    const ensureLocationEnabled = async () => {
      if (Platform.OS === 'android') {
        const isEnabled = await isLocationEnabled();
        if (!isEnabled) {
          const enableResult = await promptForEnableLocationIfNeeded();
          if (enableResult === 'enabled' || enableResult === 'already-enabled') {
            return true;
          }
          Alert.alert('Location Services Disabled', 'Please enable location services to use the map.');
          return false;
        }
      }
      return true;
    };

    const status = await check(permissionType);

    switch (status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return await ensureLocationEnabled();

      case RESULTS.DENIED: {
        const result = await request(permissionType);
        if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
          return await ensureLocationEnabled();
        }
        return false;
      }

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Location access is blocked. Please enable it in your device settings to continue.',
          [
            {
              text: 'Go to Settings',
              onPress: () => Linking.openSettings(),
            },
            { text: 'Cancel', style: 'cancel' },
          ],
        );
        return false;

      case RESULTS.UNAVAILABLE:
        Alert.alert('Location Not Available', 'This device does not support location services.');
        return false;

      default:
        return false;
    }
  } catch (error) {
    logger.log('Error requesting permissions or checking location:', error);
    Alert.alert('Error', 'Unable to access location. Please restart app again.');
    return false;
  }
};

// MY OLD METHOD --- ---- -----

// export const locationPermission = async () => {
//   try {
//     const permissionType =
//       Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

//     if (!permissionType) {
//       return;
//     }
//     const status = await check(permissionType);

//     const granted = await request(permissionType);

//     if (granted !== RESULTS.GRANTED) {
//       Alert.alert('Permission Denied', 'Location permission is required.', [
//         {
//           text: 'Go to Settings',
//           onPress: () => Linking.openSettings(),
//         },
//         { text: 'Cancel', style: 'cancel' },
//       ]);
//       return false;
//     }

//     if (Platform.OS === 'android') {
//       const isEnabled = await isLocationEnabled();
//       if (!isEnabled) {
//         const enableResult = await promptForEnableLocationIfNeeded();
//         if (!enableResult) {
//           Alert.alert('Location Services Disabled', 'Please enable location services to use the map.');
//           return false;
//         }
//       }
//     }

//     return true;
//   } catch (error) {
//     logger.log('Error requesting permissions or checking location:', error);
//     Alert.alert('Error', 'Unable to access location. Please try again.');
//     return false;
//   }
// };
