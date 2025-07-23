import {Platform} from 'react-native';

export const _isAndroid = () => {
  return Platform.OS === 'android';
};

export const _isIOS = () => {
  return Platform.OS === 'ios';
};
