import {StyleSheet} from 'react-native';
import {_color} from './colors';
import {_getStatusBarHeight} from './statusbar-height';
import {ms, mvs} from 'react-native-size-matters';

const statusBarHeight = _getStatusBarHeight();

export const _inputFieldHeight = ms(36);

export const _styles = StyleSheet.create({
  // gap
  gapMS4: {
    gap: ms(4),
  },
  gapMS8: {
    gap: ms(8),
  },
  gapMS12: {
    gap: ms(12),
  },
  gapMVS4: {
    gap: mvs(4),
  },
  gapMVS8: {
    gap: mvs(8),
  },
  gapMVS12: {
    gap: mvs(12),
  },

  // shadow color

  shadow1: {
    elevation: 1,
    shadowColor: _color.black,
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: {width: 0, height: 0},
  },
  shadow2: {
    elevation: 2,
    shadowColor: _color.black,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
  },
  shadow3: {
    elevation: 3,
    shadowColor: _color.black,
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {width: 0, height: 0},
  },
  shadow4: {
    elevation: 4,
    shadowColor: _color.black,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 0},
  },

  // Layout
  flex: {
    flex: 1,
    backgroundColor: _color.transparent,
  },
  container: {
    flex: 1,
    backgroundColor: _color.white,
  },
  contWPadding: {
    flex: 1,
    backgroundColor: _color.white,
    paddingTop: statusBarHeight || 0,
  },
  headerStyle: {paddingHorizontal: ms(18)},

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
  alignCenter: {
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

  // icon size increased by 2

  size4: {
    width: ms(4),
    height: ms(4),
  },
  size6: {
    width: ms(6),
    height: ms(6),
  },
  size8: {
    width: ms(8),
    height: ms(8),
  },
  size10: {
    width: ms(10),
    height: ms(10),
  },
  size12: {
    width: ms(12),
    height: ms(12),
  },
  size14: {
    width: ms(14),
    height: ms(14),
  },
  size16: {
    width: ms(16),
    height: ms(16),
  },
  size18: {
    width: ms(18),
    height: ms(18),
  },
  size20: {
    width: ms(20),
    height: ms(20),
  },
  size22: {
    width: ms(22),
    height: ms(22),
  },
  size24: {
    width: ms(24),
    height: ms(24),
  },
  size26: {
    width: ms(26),
    height: ms(26),
  },
  size28: {
    width: ms(28),
    height: ms(28),
  },
  size30: {
    width: ms(30),
    height: ms(30),
  },
  size32: {
    width: ms(32),
    height: ms(32),
  },
  size34: {
    width: ms(34),
    height: ms(34),
  },
  size36: {
    width: ms(36),
    height: ms(36),
  },
  size38: {
    width: ms(38),
    height: ms(38),
  },
  size40: {
    width: ms(40),
    height: ms(40),
  },
  size42: {
    width: ms(42),
    height: ms(42),
  },
  size44: {
    width: ms(44),
    height: ms(44),
  },
  size46: {
    width: ms(46),
    height: ms(46),
  },
  size48: {
    width: ms(48),
    height: ms(48),
  },
  size50: {
    width: ms(50),
    height: ms(50),
  },
  // increased by 4
  size54: {
    width: ms(54),
    height: ms(54),
  },
  size58: {
    width: ms(58),
    height: ms(58),
  },
  size62: {
    width: ms(62),
    height: ms(62),
  },
  size66: {
    width: ms(66),
    height: ms(66),
  },
  size70: {
    width: ms(70),
    height: ms(70),
  },
  size74: {
    width: ms(74),
    height: ms(74),
  },
  size78: {
    width: ms(78),
    height: ms(78),
  },
  size82: {
    width: ms(82),
    height: ms(82),
  },
  size86: {
    width: ms(86),
    height: ms(86),
  },
  size90: {
    width: ms(90),
    height: ms(90),
  },
  size94: {
    width: ms(94),
    height: ms(94),
  },
  size98: {
    width: ms(98),
    height: ms(98),
  },
  size100: {
    width: ms(100),
    height: ms(100),
  },
});
