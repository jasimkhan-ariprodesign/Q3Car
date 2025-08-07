import { useState } from 'react';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { getDefaultUiState, showApiErrorMessage, showToast, storeUserData } from '../../../utils';
import { CommonSuccessReturnType } from '../../../utils/entities/commonEntities/common-entities';
import { store } from '../../../redux';
import { setUserData } from '../../../redux/slices';

type LoginUserParams = {
  phoneOrEmail: string;
  password: string;
  userType: string;
};

export const useLoginAction = () => {
  const defaultLoginUiState: UiState<any> = getDefaultUiState();
  const [loginUiState, setLoginUiState] = useState<UiState<any>>(defaultLoginUiState);

  const loginUser = async ({ phoneOrEmail, password, userType }: LoginUserParams): Promise<CommonSuccessReturnType> => {
    if (!phoneOrEmail) {
      showToast({ text1: 'Phone or email is required', type: 'error' });
      return { success: false };
    }
    if (!password) {
      showToast({ text1: 'Password is required', type: 'error' });
      return { success: false };
    }
    if (!userType) {
      showToast({ text1: 'User type is missing', type: 'error' });
      return { success: false };
    }

    // Simple email check
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail.trim());

    const body = {
      password,
      userType,
      ...(isEmail ? { email: phoneOrEmail } : { phone: phoneOrEmail }),
    };

    setLoginUiState(getInitialLoadingState());
    try {
      const response = await postRequest(AUTH_ENDPOINTS.LOGIN, body);

      if (response) {
        response.message && showToast({ text1: response.message });
        store.dispatch(setUserData(response));
        await storeUserData(response);
        setLoginUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });
        return { success: true };
      }
    } catch (error) {
      showApiErrorMessage(error);
      setLoginUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    loginUiState,
    loginUser,
  };
};
