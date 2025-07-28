import { useState } from 'react';
import { AxiosError } from 'axios';
import { postRequest } from '../../../app';
import { AUTH_ENDPOINTS } from '../../../app/api/endpoints';
import { getDefaultUiState, getInitialLoadingState, showToast, showApiErrorMessage, storeUserData } from '../../../utils';
import { UiState } from '../../../utils/uiState/ui-state';
import { CommonSuccessReturnType } from '../../../utils/extra/commonEntities/common-entities';

export const useSetPasswordAction = () => {
  const defaultSetPasswordState: UiState<any> = getDefaultUiState();

  const [setpasswordUiState, setSetPasswordUiState] = useState<UiState<any>>(defaultSetPasswordState);

  const setPasswordFunc = async (phone: string, password: string): Promise<CommonSuccessReturnType> => {
    setSetPasswordUiState(getInitialLoadingState());

    const body = { phone, password };
    if (!phone) return { success: false };

    if (!password) {
      showToast({ text1: 'passwrod not found', type: 'error' });
      return { success: false };
    }

    try {
      const response = await postRequest(AUTH_ENDPOINTS.REGISTER_CUSTOMER, body);

      if (response) {
        response.message && showToast({ text1: response.message });
        await storeUserData(response);

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
