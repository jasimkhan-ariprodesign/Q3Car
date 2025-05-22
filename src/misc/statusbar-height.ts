import {StatusBar} from 'react-native';
import {_isIOS} from './platform';
import {_useCustomSafeAreaInsets} from './safe-area-edge';

const statusBarHeight: number = StatusBar.currentHeight ?? 0;
const insect = _useCustomSafeAreaInsets();

export const _getStatusBarHeight = (): number => {
  return _isIOS() ? insect?.top || 0 : statusBarHeight;
};
