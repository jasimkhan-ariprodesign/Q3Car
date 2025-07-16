import {_color} from './colors';
import {_styles} from './common-styles';
import {_getStatusBarHeight} from './statusbar-height';
import {_isAndroid, _isIOS} from './platform';
import {_useCustomSafeAreaInsets} from './safe-area-edge';
import {_screens} from './screens-string';
import {_height, _width} from './screen-dimensions';
import {_s, _ms, _vs, _mvs} from './responsive';
import {_strings} from './common-strings';

export {
  _isAndroid as isAndroid,
  _isIOS as isIOS,

  _color as COLORS,
  _styles as COMMON_STYLES,

  _getStatusBarHeight,
  _useCustomSafeAreaInsets as useCustomSafeAreaInsets,

  _screens as SCREENS,
  _strings as STRINGS,

  _height as WINDOW_HEIGHT,
  _width as WINDOW_WIDTH,

  _s as S,
  _ms as MS,
  _vs as VS,
  _mvs as MVS,

};
