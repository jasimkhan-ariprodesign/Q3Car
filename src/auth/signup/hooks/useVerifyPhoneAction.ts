import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { logAxiosError, logger, showToast } from '../../../utils';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';

export const useVerifyPhoneAction = () => {
  const defaultVerifyPhoneState: UiState<any> = getDefaultUiState();

  const [verifyPhoneUiState, setVerifyPhoneUiState] = useState<UiState<any>>(defaultVerifyPhoneState);

  const verifyPhoneNumber = async (phone: string, countryCode: string) => {
    setVerifyPhoneUiState(getInitialLoadingState());
    const body = {
      phoneNumber: `${countryCode}${phone}`,
      purpose: 'verifyPhone',
    };

    try {
      if (!phone) {
        return showToast({ text1: 'phone number not found', type: 'error' });
      }

      const response = await postRequest(AUTH_ENDPOINTS.SEND_OTP_TO_PHONE, body);

      if (response) {
        response.message && showToast({ text1: response.message });
        setVerifyPhoneUiState({
          isLoading: false,
          data: response,
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
