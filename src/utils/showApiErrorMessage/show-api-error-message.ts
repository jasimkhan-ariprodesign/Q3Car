import { AxiosError } from 'axios';
import { showToast } from '../toast/toast';

export const showApiErrorMessage = (error: AxiosError | any, fallbackMessage: string = 'Something went wrong') => {
  const rawData = error?.response?.data || error?.data || error;
  const messageContent = rawData?.message || rawData?.message || rawData?.error || rawData.data || fallbackMessage; // based on api error message

  let messageToShow = fallbackMessage;

  if (messageContent && typeof messageContent === 'string') {
    messageToShow = messageContent;
  } else if (typeof messageContent === 'object' && messageContent != null && messageContent.hasOwnProperty('message')) {
    const nestedMessage = messageContent.message;

    if (typeof nestedMessage === 'string') {
      messageToShow = messageContent.message;
    }
  }
  showToast({ text1: messageToShow, type: 'error' });
};
