import {StatusBar} from 'react-native';
import React from 'react';
import {COLORS} from '../../misc';

type PropsAppStatusBar = {
  statusBarColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  translucent?: boolean;
};

const AppStatusBar = ({
  statusBarColor = COLORS.transparent,
  barStyle = 'dark-content',
  translucent = true,
}: PropsAppStatusBar) => {
  return (
    <StatusBar
      animated={true}
      translucent={translucent}
      barStyle={barStyle}
      backgroundColor={statusBarColor}
    />
  );
};

export default AppStatusBar;
