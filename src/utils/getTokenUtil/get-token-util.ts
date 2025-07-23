import * as Keychain from 'react-native-keychain';
import { logger } from '..';

type Credential = {
  accessToken: string | null;
  refreshToken: string | null;
  user: string | null;
  userId: string | null;
};

export const getTokenUtil = async (): Promise<Credential> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const parsedData = credentials?.password
        ? JSON.parse(credentials.password).data
        : {};

      const id =
        parsedData?.user?.loggedInUser?._id || parsedData?.user?._id || null;

      return {
        accessToken: parsedData?.accessToken || null,
        refreshToken: parsedData?.refreshToken || null,
        user: credentials?.username || null,
        userId: id,
      };
    }

    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      userId: null,
    };
  } catch (error) {
    logger.log('getTokenUtil error :', error);
    return {
      accessToken: null,
      refreshToken: null,
      user: null,
      userId: null,
    };
  }
};
