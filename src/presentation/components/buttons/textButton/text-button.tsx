import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLORS, MS} from '../../../../misc';
import {FONTS} from '../../../../assets';
import { logger } from '../../../../utils';

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
  onPress = () => logger.log('Button pressed'), // Default empty function
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
        <ActivityIndicator color={COLORS.primary || COLORS.white} />
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
    color: COLORS.black,
    fontSize: MS(14),
    fontFamily: FONTS.poppinsRegular,
    includeFontPadding: false,
  },
});

export default TextButton;
