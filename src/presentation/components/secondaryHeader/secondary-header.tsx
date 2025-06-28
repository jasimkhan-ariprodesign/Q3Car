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
import {_color, _ms, _mvs} from '../../../misc';
import {useNavigation} from '@react-navigation/native';

interface SecondaryHeaderProps {
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  containerStyle?: ViewStyle;
  buttonContStyle?: ViewStyle;
  iconStyle?: ImageStyle;
  titleStyle?: TextStyle;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
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
        <Image source={_icons.closeBlack} style={[styles.icon, iconStyle]} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: _mvs(12),
    alignSelf: 'flex-start',
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: _ms(8),
    alignSelf: 'flex-start',
  },
  icon: {
    width: _ms(18),
    height: _ms(18),
    tintColor: _color.textPrimary,
  },
});
