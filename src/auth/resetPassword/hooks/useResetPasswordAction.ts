import { useState } from 'react';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { showApiErrorMessage, showToast } from '../../../utils';
import { CommonSuccessReturnType } from '../../../utils/entities/commonEntities/common-entities';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';

interface ResetUserPasswordProp {
  input: string;
  password: string;
  userType: string;
}

export const useResetPasswordAction = () => {
  const defaultState: UiState<any> = getDefaultUiState();
  const [resetPasswordUiState, setResetPasswordUiState] = useState<UiState<any>>(defaultState);

  const resetUserPassword = async ({
    input,
    password,
    userType,
  }: ResetUserPasswordProp): Promise<CommonSuccessReturnType> => {
    if (!input || !userType) return { success: false };

    if (!password) {
      showToast({ text1: 'passwrod not found', type: 'error' });
      return { success: false };
    }

    setResetPasswordUiState(getInitialLoadingState());

    const body = { input, password, userType };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.RESET_PASSWORD, body);
      if (response) {
        response.message && showToast({ text1: response.message, visibilityTime: 1500 });

        setResetPasswordUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error) {
      showApiErrorMessage(error);
      setResetPasswordUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    resetPasswordUiState,
    resetUserPassword,
  };
};
