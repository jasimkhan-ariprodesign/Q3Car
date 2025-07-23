import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {ICONS} from '../../../assets';
import {COLORS, MS, MVS} from '../../../misc';
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
  containerStyle,
  buttonContStyle,
  iconStyle,
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
        <Image source={ICONS.closeBlack} style={[styles.icon, iconStyle]} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SecondaryHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: MVS(12),
    alignSelf: 'flex-start',
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),
    alignSelf: 'flex-start',
  },
  icon: {
    width: MS(18),
    height: MS(18),
    tintColor: COLORS.textPrimary,
  },
});
