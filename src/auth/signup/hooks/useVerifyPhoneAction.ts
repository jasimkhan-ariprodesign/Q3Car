import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { logAxiosError, logger } from '../../../utils';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';

export const useVerifyPhoneAction = () => {
  const defaultVerifyPhoneState: UiState<any> = getDefaultUiState();

  const [verifyPhoneUiState, setVerifyPhoneUiState] = useState<UiState<any>>(defaultVerifyPhoneState);

  const verifyPhoneNumber = async (phone: string) => {
    setVerifyPhoneUiState(getInitialLoadingState());
    const body = {
      phoneNumber: phone,
      purpose: 'verifyPhone',
    };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.SEND_OTP_TO_PHONE, body);

      if (response?.data) {
        setVerifyPhoneUiState({
          isLoading: false,
          data: response.data,
          error: undefined,
        });
      }
    } catch (error: AxiosError | any) {
      setVerifyPhoneUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  };

  return {
    verifyPhoneUiState,
    verifyPhoneNumber,
  };
};
