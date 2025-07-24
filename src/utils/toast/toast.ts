import { Toast } from 'toastify-react-native';
import { COLORS, MS } from '../../misc';

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
}

export const showToast = ({
  type = 'success',
  text1,
  text2,
  position = 'center',
  visibilityTime = 2000,
  textColor,
  backgroundColor,
  theme = 'dark',
  useModal = true,
  autoHide = true,
  iconColor,
  iconSize = MS(20),
  closeIconColor = COLORS.transparent,
  closeIconSize = MS(20),
  progressBarColor = COLORS.transparent,
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
      console.warn('onPress');
    },
    onHide() {
      console.warn('close');
    },
    onShow() {
      console.warn('show');
        
    },
  });
};

// // Toast.show({
// //           type: 'success',
// //           text1: 'Custom Toast',
// //           text2: 'With many options',
// //           position: 'bottom',
// //           visibilityTime: 5000,
// //           autoHide: true,
// //           backgroundColor: '#333',
// //           textColor: '#fff',
// //           iconColor: '#4CAF50',
// //           iconSize: 14,
// //           progressBarColor: '#4CAF50',
// //           theme: 'dark',
// //           // Custom close icon options
// //           closeIcon: 'times-circle',
// //           closeIconFamily: 'FontAwesome',
// //           closeIconSize: 20,
// //           closeIconColor: '#fff',

// //         });
