import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {_color, _ms, _mvs} from '../../../../misc';
import {_fonts} from '../../../../assets';

interface PrimaryButtonProps {
  title?: string;
  onPress?: () => void;
  clickable?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title = '',
  onPress = () => console.log('Primary Button Pressed'),
  clickable = true,
  buttonStyle = {},
  textStyle = {},
  isLoading = false,
  disabled = false,
  children,
}) => {
  const isButtonDisabled = !clickable || disabled || isLoading;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      disabled={isButtonDisabled}
      activeOpacity={0.7}>
      {isLoading ? (
        <ActivityIndicator color={_color.primary || _color.white} />
      ) : (
        <>{children || <Text style={[styles.text, textStyle]}>{title}</Text>}</>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: _color.primary,
    borderRadius: 8,
    minHeight: _mvs(34),
  },
  text: {
    color: _color.white,
    fontSize: _ms(14),
    fontFamily: _fonts.workSansMedium,
  },
});

export default PrimaryButton;
