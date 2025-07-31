import { Toast } from 'toastify-react-native';
import { COLORS, MS } from '../../misc';
import { logger } from '..';

type ToastType = 'success' | 'error' | 'info' | 'warn' | 'default';

interface ToastOptions {
  type?: ToastType;
  text1: string;
  text2?: string;
  position?: 'top' | 'bottom' | 'center';
  visibilityTime?: number;
  textColor?: string;
  backgroundColor?: string;
  theme?: 'light' | 'dark';
  useModal?: boolean;
  autoHide?: boolean;
  iconColor?: string;
  iconSize?: number;
  closeIconColor?: string;
  closeIconSize?: number;
  progressBarColor?: string;
  onPress?: () => void;
  onHide?: () => void;
  onShow?: () => void;
}

export const showToast = ({
  type = 'success',
  text1,
  text2,
  position = 'top',
  visibilityTime = 800,
  textColor,
  backgroundColor,
  theme = 'light',
  useModal = false,
  autoHide = true,
  iconColor,
  iconSize = MS(20),
  closeIconColor = COLORS.transparent,
  closeIconSize = MS(20),
  progressBarColor = COLORS.transparent,
  onPress,
  onHide,
  onShow,
}: ToastOptions) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime,
    textColor,
    backgroundColor,
    theme,
    useModal,
    autoHide,
    iconColor,
    iconSize,
    closeIconColor,
    closeIconSize,
    progressBarColor,
    onPress() {
      Toast.hide();
      onPress?.();
      logger.log('Toast was pressed!');
    },
    onHide() {
      onHide?.();
      // logger.log('Toast was hide!');
    },
    onShow() {
      onShow?.();
      // logger.log('Toast was showed!');
    },
  });
};
