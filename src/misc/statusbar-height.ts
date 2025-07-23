import {StatusBar} from 'react-native';
import {_isIOS} from './platform';

const statusBarHeight: number = StatusBar.currentHeight ?? 0;

export const _getStatusBarHeight = (): number => {
  return _isIOS() ? 0 : statusBarHeight;
};
