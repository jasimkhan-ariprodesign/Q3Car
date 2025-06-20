import {StatusBar} from 'react-native';
import React from 'react';
import {_color} from '../../misc';

type PropsAppStatusBar = {
  statusBarColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  translucent?: boolean;
};

const AppStatusBar = ({
  statusBarColor = _color.transparent,
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
