import { useState } from 'react';
import { getDefaultUiState, getUserData, logger, showApiErrorMessage, showToast } from '../../../../utils';
import { UiState } from '../../../../utils/uiState/ui-state';
import { getRequest } from '../../../../app';
import { AUTH_ENDPOINTS } from '../../../../app/api/endpoints';
import { CommonSuccessReturnType } from '../../../../utils/entities/commonEntities/common-entities';

export const useFetchUser = () => {
  const defaultFetchUserUiState: UiState<any> = getDefaultUiState();
  const [fetchUserUiState, setFetchUserUiState] = useState<UiState<any>>(defaultFetchUserUiState);

  const fetchUser = async (): Promise<CommonSuccessReturnType> => {
    try {
      const user_data = await getUserData();
      const userId = user_data?.data?.user?._id || '';

      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await getRequest(AUTH_ENDPOINTS.FETCH_SINGLE_USER, {}, { userId });

      if (response) {
        response.message && showToast({ text1: response.message });

        setFetchUserUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error) {
      showApiErrorMessage(error);
      setFetchUserUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    fetchUserUiState,
    fetchUser,
  };
};
