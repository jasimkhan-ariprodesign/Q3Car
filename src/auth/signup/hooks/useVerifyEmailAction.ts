import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { logAxiosError, logger } from '../../../utils';
import { postRequest } from '../../../app';

export const useVerifyEmailAction = () => {
  const defaultVerifyEmailState: UiState<any> = getDefaultUiState();

  const [verifyEmailUiState, setVerifyEmailUiState] = useState<UiState<any>>(defaultVerifyEmailState);

  const verifyEmail = async (email: string) => {
    setVerifyEmailUiState(getInitialLoadingState());
    const body = {
      to: email,
    };

    try {
      const response = await postRequest('/auth/register', body);
      logger.log('verifyEmail response: ', response);

      if (response) {
        setVerifyEmailUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });
      }
    } catch (error: AxiosError | any) {
      logAxiosError('verifyEmail error: ', error);
      setVerifyEmailUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  };

  return {
    verifyEmailUiState,
    verifyEmail,
  };
};
