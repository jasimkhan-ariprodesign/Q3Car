import {StyleSheet} from 'react-native';
import {_color} from './colors';
import {_getStatusBarHeight} from './statusbar-height';

const statusBarHeight = _getStatusBarHeight();
export const _styles = StyleSheet.create({
  // Layout
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: _color.white,
    paddingTop: statusBarHeight || 0,
  },

  // Flexbox Alignment
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerVertical: {
    justifyContent: 'center',
  },
  centerHorizontal: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  selfCenter: {
    alignSelf: 'center',
  },

  // Flex Direction
  row: {
    flexDirection: 'row',
  },

  // Spacing
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
