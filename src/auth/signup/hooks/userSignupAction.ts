import { useState } from 'react';
import {
  getDefaultUiState,
  getInitialLoadingState,
  UiState,
} from '../../../utils/uiState/ui-state';
import { SignUpInitialValuesEntity } from '../entities/user-signup-entity';
import _logger from '../../../utils/logger/logger';
import { postRequest } from '../../../app';

export const userSignupAction = () => {
  const defaultSignupState: UiState<any> = getDefaultUiState();

  const [signupUiState, setSignupUiState] =
    useState<UiState<any>>(defaultSignupState);

  const registerUser = async (values: SignUpInitialValuesEntity) => {
    setSignupUiState(getInitialLoadingState());
    const body = {
      fullName: values.fullName,
      email: values.email,
      phone: `${values.countryCode}${values.phone}`,
      avatar: values.avatar,
      userType: values.userType,
    };
    _logger.warn('body', JSON.stringify(body, null, 1));
    try {
      const result = await postRequest('/auth/register', body);
      console.log('User registered:', result);
      if (result) {
        setSignupUiState({
          isLoading: false,
          data: result,
          error: undefined,
        });
      }
    } catch (err) {
      console.log('Registration failed:', err);
      setSignupUiState({
        isLoading: false,
        data: undefined,
        error: err,
      });
    }
  };

  return {
    signupUiState,
    registerUser,
  };
};
