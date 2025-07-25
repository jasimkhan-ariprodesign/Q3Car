import { useState } from 'react';
import { AxiosError } from 'axios';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { SignUpInitialValuesEntity } from '../entities/user-signup-entity';
import { postRequest } from '../../../app';
import { logAxiosError, logger } from '../../../utils';
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
    // _logger.warn('body', JSON.stringify(body, null, 1));
    try {
      const result = await postRequest(AUTH_ENDPOINTS.REGISTER_CUSTOMER, body);
      logger.log('registerUser response: ', result);

      if (result) {
        setSignupUiState({
          isLoading: false,
          data: result,
          error: undefined,
        });
      }
    } catch (error: AxiosError | any) {
      logAxiosError('registerUser error: ', error);
      setSignupUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
    }
  };

  return {
    signupUiState,
    registerUser,
  };
};
