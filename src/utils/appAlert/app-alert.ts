import { Alert, AlertButton } from 'react-native';

type ConfirmOptions = {
  title?: string;
  message?: string;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
};

export const appAlert = {
  alert: (message: string, title?: string) => {
    Alert.alert(title || '', message);
  },

  confirm: (
    title: string = 'Confirm',
    message: string = '',
    onOk?: () => void,
    onCancel?: () => void,
    okText: string = 'OK',
    cancelText: string = 'Cancel',
  ) => {
    const buttons: AlertButton[] = [
      {
        text: cancelText,
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: okText,
        onPress: onOk,
      },
    ];

    Alert.alert(title, message, buttons);
  },

  // ✅ New flexible confirm method
  confirmWithOptions: (options: ConfirmOptions) => {
    const {
      title = 'Confirm',
      message = '',
      onOk,
      onCancel,
      okText = 'OK',
      cancelText = 'Cancel',
    } = options;

    const buttons: AlertButton[] = [
      {
        text: cancelText,
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: okText,
        onPress: onOk,
      },
    ];

    Alert.alert(title, message, buttons);
  },
};
