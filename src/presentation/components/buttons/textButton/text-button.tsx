import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {_color, _ms} from '../../../../misc';
import {_fonts} from '../../../../assets';

interface ReusableButtonProps {
  title?: string;
  onPress?: () => void;
  clickable?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  isLoading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const TextButton: React.FC<ReusableButtonProps> = ({
  title = 'Button', // Default title
  onPress = () => console.log('Button pressed'), // Default empty function
  clickable = true, // Default true
  buttonStyle = {},
  textStyle = {},
  isLoading = false,
  disabled = true,
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
  },
  text: {
    color: _color.black,
    fontSize: _ms(14),
    fontFamily: _fonts.poppinsRegular,
    includeFontPadding: false,
  },
});

export default TextButton;
