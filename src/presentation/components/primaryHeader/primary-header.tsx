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
import {_fonts, _icons} from '../../../assets';
import {COLORS, ms, mvs} from '../../../misc';
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
          source={_icons.angleLeftDark}
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
    paddingVertical: mvs(12),
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: ms(8),
    alignSelf: 'flex-start',
  },
  icon: {
    width: ms(10),
    height: ms(17),
    tintColor: COLORS.textPrimary,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: ms(14),
    fontFamily: _fonts.workSansRegular,
    includeFontPadding: false,
  },
});
