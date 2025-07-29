import { useState } from 'react';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { getDefaultUiState, showApiErrorMessage, showToast, storeUserData } from '../../../utils';
import { CommonSuccessReturnType } from '../../../utils/entities/commonEntities/common-entities';

type LoginUserParams = {
  phoneOrEmail: string;
  password: string;
};

export const useLoginAction = () => {
  const defaultLoginUiState: UiState<any> = getDefaultUiState();
  const [loginUiState, setLoginUiState] = useState<UiState<any>>(defaultLoginUiState);

  const loginUser = async ({ phoneOrEmail, password }: LoginUserParams): Promise<CommonSuccessReturnType> => {
    if (!phoneOrEmail) {
      showToast({ text1: 'phone or email not found', type: 'error' });
      return { success: false };
    }
    if (!password) {
      showToast({ text1: 'password not found', type: 'error' });
      return { success: false };
    }

    const body = {
      email: phoneOrEmail,
      password: password,
    };

    setLoginUiState(getInitialLoadingState());
    try {
      const response = await postRequest(AUTH_ENDPOINTS.LOGIN, body);

      if (response) {
        response.message && showToast({ text1: response.message });
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
