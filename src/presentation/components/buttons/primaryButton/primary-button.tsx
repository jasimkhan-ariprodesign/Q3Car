import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {COLORS, MS, MVS} from '../../../../misc';
import {FONTS} from '../../../../assets';
import { logger } from '../../../../utils';

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
  onPress = () => logger.log('Primary Button Pressed'),
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
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    minHeight: MVS(34),
  },
  text: {
    color: COLORS.white,
    fontSize: MS(14),
    fontFamily: FONTS.workSansMedium,
  },
});

export default PrimaryButton;
