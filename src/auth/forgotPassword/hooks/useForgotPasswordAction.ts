import { useState } from 'react';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../utils/uiState/ui-state';
import { CommonSuccessReturnType } from '../../../utils/entities/commonEntities/common-entities';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { showApiErrorMessage, showToast } from '../../../utils';

interface forgotPasswordProp {
  input: string;
  userType: string;
}

export const useForgotPasswordAction = () => {
  const defaultState: UiState<any> = getDefaultUiState();
  const [forgotPasswordUiState, setForgotPasswordUiState] = useState<UiState<any>>(defaultState);

  const forgotPassword = async ({ input, userType }: forgotPasswordProp): Promise<CommonSuccessReturnType> => {
    if (!input || !userType) {
      return { success: false };
    }

    const payload = { input, userType };
    setForgotPasswordUiState(getInitialLoadingState());

    try {
      const response = await postRequest(AUTH_ENDPOINTS.FORGOT_PASSWORD, payload);

      if (response) {
        response.message && showToast({ text1: response.message });

        setForgotPasswordUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error) {
      showApiErrorMessage(error);
      setForgotPasswordUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    forgotPasswordUiState,
    forgotPassword,
  };
};
