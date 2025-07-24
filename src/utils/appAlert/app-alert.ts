import { Alert, AlertButton } from 'react-native';

const appAlert = {
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
};

export default appAlert;
