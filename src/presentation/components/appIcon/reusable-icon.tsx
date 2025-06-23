import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { _logger } from '../../../utils';

interface IconProp {
  iconBtnStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  onPress?: () => void;
  disabled?: boolean;
  icon?: ImageSourcePropType | {uri: string};
  resizeMode?: 'contain' | 'cover' | 'center' | 'stretch';
}

const Icon: React.FC<IconProp> = ({
  iconBtnStyle = {},
  iconStyle = {},
  onPress = () => _logger.log('icon pressed'),
  disabled = true,
  icon,
  resizeMode = 'contain',
}) => {
  if (!icon) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, iconBtnStyle]}
      accessibilityRole="button">
      <Image
        source={icon}
        style={[iconStyle]}
        resizeMode={resizeMode}
        accessibilityLabel="Icon button"
      />
    </TouchableOpacity>
  );
};

export default Icon;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
