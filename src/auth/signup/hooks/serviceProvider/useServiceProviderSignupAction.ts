import { useState } from 'react';
import { AxiosError } from 'axios';
import { postRequest } from '../../../../app';
import { AUTH_ENDPOINTS } from '../../../../app/api/endpoints';
import { UiState } from '../../../../utils/uiState/ui-state';
import { getDefaultUiState, getInitialLoadingState, showToast, showApiErrorMessage } from '../../../../utils';
import { SPSignUpInitialEntity } from '../../../../utils/entities/auth/sp-signup-entity';

export const useServiceProviderSignupAction = () => {
  const defaultServiceProviderSignupState: UiState<any> = getDefaultUiState();

  const [serviceProviderSignupUiState, setServiveProviderSignupUiState] = useState<UiState<any>>(
    defaultServiceProviderSignupState,
  );

  const registerServiceProvider = async (values: SPSignUpInitialEntity) => {
    if (!values) {
      return { success: false };
    }

    setServiveProviderSignupUiState(getInitialLoadingState());

    const body = {
      fullName: values.fullName,
      email: values.email,
      phone: `${values.countryCode}${values.phone}`,
      avatar: values.avatar,
      driverLicense: values.driverLicense,
      driverLicenseImage: values.driverLicenseImage,
      insuranceNumber: values.insuranceNumber,
      insuranceImage: values.insuranceImage,
      userType: values.userType,
    };

    try {
      const response = await postRequest(AUTH_ENDPOINTS.REGISTER_CUSTOMER, body);

      if (response?.success) {
        response.message && showToast({ text1: response.message });

        setServiveProviderSignupUiState({
          isLoading: false,
          data: response,
          error: undefined,
        });

        return { success: true };
      }
    } catch (error: AxiosError | any) {
      showApiErrorMessage(error);
      setServiveProviderSignupUiState({
        isLoading: false,
        data: undefined,
        error: error,
      });
      return { success: false };
    }
    return { success: false };
  };

  return {
    serviceProviderSignupUiState,
    registerServiceProvider,
  };
};
