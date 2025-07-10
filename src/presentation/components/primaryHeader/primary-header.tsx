import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FONTS, ICONS} from '../../../assets';
import {COLORS, MS, MVS} from '../../../misc';
import {useNavigation} from '@react-navigation/native';

interface PrimaryHeaderProps {
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  containerStyle?: ViewStyle;
  buttonContStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  titleStyle?: TextStyle;
}

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  disabled = false,
  onPress,
  title = 'Back',
  containerStyle,
  buttonContStyle,
  iconStyle,
  titleStyle,
}) => {
  const navigation = useNavigation();

  const handleBackClick = () => {
    if (onPress) {
      return onPress();
    }
    navigation.goBack();
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={handleBackClick}
        activeOpacity={0.7}
        disabled={disabled}
        style={[styles.buttonCont, buttonContStyle]}
        accessibilityLabel="Go back"
        accessibilityRole="button">
        <Image
          source={ICONS.angleLeftDark}
          style={[styles.icon, iconStyle]}
          resizeMode="contain"
        />
        <Text style={[styles.title, titleStyle]}>{title || ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: MVS(12),
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),
    alignSelf: 'flex-start',
  },
  icon: {
    width: MS(10),
    height: MS(17),
    tintColor: COLORS.textPrimary,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
});
