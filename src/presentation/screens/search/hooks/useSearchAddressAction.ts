import { useState } from 'react';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../../../../utils/uiState/ui-state';
import { showToast } from '../../../../utils';

export const useSearchAddressAction = () => {
  const defaultState: UiState<any> = getDefaultUiState();
  const [serachAddressUiState, setSerachAddressUiState] = useState<UiState<any>>(defaultState);

  const serachAddress = (input: string) => {
    // address

    if (!input) {
      showToast({ text1: 'passwrod not found', type: 'error' });
      return { success: false };
    }

    setSerachAddressUiState(getInitialLoadingState());
  };
};
