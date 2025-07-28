import { useState } from 'react';
import { AxiosError } from 'axios';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { showApiErrorMessage, showToast } from '../../../utils';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';

type VerifyOtpResponse<T = any> = {
  success: boolean;
};

export const useVerifyEmailAction = () => {
  const defaultVerifyEmailState: UiState<any> = getDefaultUiState();

  const [verifyEmailUiState, setVerifyEmailUiState] = useState<UiState<any>>(defaultVerifyEmailState);

  // send otp to email function
  const verifyEmail = async (email: string) => {
    if (!email) {
      return showToast({ text1: 'email not found', type: 'error' });
    }

    setVerifyEmailUiState(getInitialLoadingState());

    const body = {
      to: email,
    };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.SEND_OTP_TO_EMAIL, body);

      if (response) {
        response.message && showToast({ text1: response.message });

        setVerifyEmailUiState({
          isLoading: false,
          data: response.data,
          error: undefined,
        });
      }
    } catch (error: AxiosError | any) {
      showApiErrorMessage(error);
      setVerifyEmailUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  };

  // verify email otp
  const verifyEmailOtp = async <T = any>(email: string, otp: string): Promise<VerifyOtpResponse<T>> => {
    setVerifyEmailUiState(getInitialLoadingState());
    const body = { email: email, code: otp };

    if (!email) return { success: false };

    if (!otp) {
      showToast({ text1: 'otp not found', type: 'error' });
      return { success: false };
    }

    try {
      const response = await postRequest(AUTH_ENDPOINTS.VERIFY_EMAIL, body);

      if (response) {
        response.message && showToast({ text1: response.message });
        setVerifyEmailUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });
        return {
          success: true,
        };
      }
    } catch (error: AxiosError | any) {
      showApiErrorMessage(error);
      setVerifyEmailUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });

      return { success: false };
    }
    return { success: false };
  };

  return {
    verifyEmailUiState,
    verifyEmail,
    verifyEmailOtp,
  };
};
