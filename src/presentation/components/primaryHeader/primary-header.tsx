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
  backDisabled?: boolean;
  backPressFunction?: () => void;
  backString?: string;
  containerStyle?: ViewStyle;
  backButtonStyle?: ViewStyle;
  backIconStyle?: ImageStyle;
  backStringStyle?: TextStyle;

  rightBTNString?: string;
  rightBTNFunction?: Function;
  rightBTNDisabled?: boolean;
  rightBTNStringStyle?: TextStyle;
  rightBTNStyle?: ViewStyle;
}

const PrimaryHeader: React.FC<PrimaryHeaderProps> = ({
  backDisabled = false,
  backPressFunction,
  backString = 'Back',
  containerStyle,
  backButtonStyle,
  backIconStyle,
  backStringStyle,

  rightBTNString,
  rightBTNFunction,
  rightBTNDisabled = true,
  rightBTNStringStyle,
  rightBTNStyle,
}) => {
  const navigation = useNavigation();

  const handleBackClick = () => {
    if (backPressFunction) {
      return backPressFunction();
    }
    navigation.goBack();
  };

  const _handleRightButtonClick = () => {
    rightBTNFunction && rightBTNFunction();
  };

  const _renderBackButton = () => {
    return (
      <TouchableOpacity
        onPress={handleBackClick}
        activeOpacity={0.7}
        disabled={backDisabled}
        style={[styles.buttonCont, backButtonStyle]}
        accessibilityLabel="Go back"
        accessibilityRole="button">
        <Image
          source={ICONS.angleLeftDark}
          style={[styles.icon, backIconStyle]}
          resizeMode="contain"
        />
        <Text style={[styles.stringStyle, backStringStyle]}>{backString || ''}</Text>
      </TouchableOpacity>
    );
  };

  const _renderRightSideOptionalButton = () => {
    return (
      <TouchableOpacity
        onPress={_handleRightButtonClick}
        style={[rightBTNStyle]}
        activeOpacity={rightBTNDisabled ? 1 : 0.7}
        disabled={backDisabled}>
        <Text style={[styles.stringStyle, rightBTNStringStyle]}>{rightBTNString || ''}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* back button */}
      {_renderBackButton()}

      {/* right side button - optional */}
      {_renderRightSideOptionalButton()}
    </View>
  );
};

export default PrimaryHeader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: MVS(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCont: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: MS(8),
  },
  icon: {
    width: MS(10),
    height: MS(17),
    tintColor: COLORS.textPrimary,
  },
  stringStyle: {
    color: COLORS.textPrimary,
    fontSize: MS(14),
    fontFamily: FONTS.workSansRegular,
    includeFontPadding: false,
  },
});
