import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { postRequest } from '../../../app';
import { showApiErrorMessage, showToast, storeUserData } from '../../../utils';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { CustomerSignUpInitialEntity } from '../../../utils/entities/auth/customer-signup-entity';

export const useCustomerSignupAction = () => {
  const defaultSignupState: UiState<any> = getDefaultUiState();

  const [signupUiState, setSignupUiState] = useState<UiState<any>>(defaultSignupState);

  const registerCustomer = async (values: CustomerSignUpInitialEntity) => {
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
    registerCustomer,
  };
};
