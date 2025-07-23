import {Alert, Linking} from 'react-native';
import {isAndroid} from '../../misc';
import _logger from '../logger/logger';

export const _hanldeOpenUrlFunc = async (url: string) => {
  if (!url) return _logger.info('url not found');

  try {
    if (isAndroid()) {
      await Linking.openURL(url);
    } else {
      const urlSupported = await Linking.canOpenURL(url);
      if (urlSupported) {
        await Linking.openURL(url);
        await Linking.openURL(url);
      }
    }
  } catch (error: any) {
    Alert.alert('Error', 'Failed to open');
  }
};
