import * as Keychain from 'react-native-keychain';
import { logger } from '..';

export const SERVICE_KEY = 'user_login_data';

export const storeUserData = async (userData: object) => {
  try {
    const serializedData = JSON.stringify(userData);
    await Keychain.setGenericPassword('user', serializedData, {
      service: SERVICE_KEY,
    });
    logger.info('user_login_data save successfully...');
    return true;
  } catch (error) {
    logger.log('Failed to store user data:', error);
    return false;
  }
};

export const getUserData = async (): Promise<any | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE_KEY,
    });

    if (credentials && credentials.password) {
      return JSON.parse(credentials.password);
    }

    return null;
  } catch (error) {
    logger.log('Failed to retrieve user data:', error);
    return null;
  }
};

export const resetUserData = async () => {
  try {
    await Keychain.resetGenericPassword({ service: SERVICE_KEY });
    return true;
  } catch (error) {
    logger.log('Failed to reset user data:', error);
    return false;
  }
};
