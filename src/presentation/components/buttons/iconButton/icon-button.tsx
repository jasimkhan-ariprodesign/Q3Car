import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {logger} from '../../../../utils';

interface IconButtonProp {
  iconBtnStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  onPress?: () => void;
  disabled?: boolean;
  icon?: ImageSourcePropType | {uri: string};
  resizeMode?: 'contain' | 'cover' | 'center' | 'stretch';
  tintColor?: string;
}

const IconButton: React.FC<IconButtonProp> = ({
  iconBtnStyle = {},
  iconStyle = {},
  onPress = () => logger.log('icon pressed'),
  disabled = true,
  icon,
  resizeMode = 'contain',
  tintColor = null,
}) => {
  if (!icon) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disabled ? 0.9 : 0.5}
      disabled={disabled}
      style={[styles.container, iconBtnStyle]}
      accessibilityRole="button">
      <Image
        source={icon}
        style={[iconStyle]}
        resizeMode={resizeMode}
        accessibilityLabel="Icon button"
        tintColor={tintColor || ''}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
