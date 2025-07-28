import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { showApiErrorMessage, showToast } from '../../../utils';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';

type VerifyOtpResponse<T = any> = {
  success: boolean;
};

export const useVerifyPhoneAction = () => {
  const defaultVerifyPhoneState: UiState<any> = getDefaultUiState();

  const [verifyPhoneUiState, setVerifyPhoneUiState] = useState<UiState<any>>(defaultVerifyPhoneState);

  // send otp to phone
  const verifyPhoneNumber = async (phone: string, countryCode: string) => {
    if (!phone) {
      return showToast({ text1: 'phone number not found', type: 'error' });
    }

    setVerifyPhoneUiState(getInitialLoadingState());

    const body = {
      phoneNumber: `${countryCode}${phone}`,
      purpose: 'verifyPhone',
    };


    try {
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
      showApiErrorMessage(error);
      setVerifyPhoneUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  };

  // verify phone otp
  const verifyPhoneNumOtp = async <T = any>(phone: string, otp: string): Promise<VerifyOtpResponse<T>> => {
    setVerifyPhoneUiState(getInitialLoadingState());

    const body = {
      phoneNumber: phone,
      purpose: 'verifyPhone',
      otp: otp,
    };

    if (!phone) return { success: false };

    if (!otp) {
      showToast({ text1: 'otp not found', type: 'error' });
      return { success: false };
    }

    try {
      const response = await postRequest(AUTH_ENDPOINTS.VERIFY_PHONE, body);

      if (response) {
        response.message && showToast({ text1: response.message });
        setVerifyPhoneUiState({
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
      setVerifyPhoneUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });

      return { success: false };
    }
    return { success: false };
  };

  return {
    verifyPhoneUiState,
    verifyPhoneNumber,
    verifyPhoneNumOtp,
  };
};
