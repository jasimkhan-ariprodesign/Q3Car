import { useState } from 'react';
import { AxiosError } from 'axios';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { UiState } from '../../../utils/uiState/ui-state';
import { CommonSuccessReturnType } from '../../../utils/entities/commonEntities/common-entities';
import { getDefaultUiState, getInitialLoadingState, showToast, showApiErrorMessage } from '../../../utils';

export const useSetPasswordAction = () => {
  const defaultSetPasswordState: UiState<any> = getDefaultUiState();

  const [setpasswordUiState, setSetPasswordUiState] = useState<UiState<any>>(defaultSetPasswordState);

  const setPasswordFunc = async (phone: string, password: string): Promise<CommonSuccessReturnType> => {
    if (!phone) return { success: false };

    if (!password) {
      showToast({ text1: 'passwrod not found', type: 'error' });
      return { success: false };
    }

    setSetPasswordUiState(getInitialLoadingState());

    const body = { phone, password };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.SETPASSWORD, body);

      if (response) {
        response.message && showToast({ text1: response.message });

        setSetPasswordUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error: AxiosError | any) {
      showApiErrorMessage(error);
      setSetPasswordUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    setpasswordUiState,
    setPasswordFunc,
  };
};
