import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { SignUpInitialValuesEntity } from '../entities/user-signup-entity';
import { postRequest } from '../../../app';
import { showApiErrorMessage, showToast, storeUserData } from '../../../utils';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';

export const useCustomerSignupAction = () => {
  const defaultSignupState: UiState<any> = getDefaultUiState();

  const [signupUiState, setSignupUiState] = useState<UiState<any>>(defaultSignupState);

  const registerUser = async (values: SignUpInitialValuesEntity) => {
    setSignupUiState(getInitialLoadingState());

    const body = {
      fullName: values.fullName,
      email: values.email,
      phone: `${values.countryCode}${values.phone}`,
      avatar: values.avatar,
      userType: values.userType,
    };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.REGISTER_CUSTOMER, body);

      if (response?.success) {
        response.message && showToast({ text1: response.message });

        setSignupUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error: AxiosError | any) {
      showApiErrorMessage(error);
      setSignupUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    signupUiState,
    registerUser,
  };
};
