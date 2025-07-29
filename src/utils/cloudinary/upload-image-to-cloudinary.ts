import { useState } from 'react';
import { showApiErrorMessage } from '../showApiErrorMessage/show-api-error-message';
import { UiState, getDefaultUiState, getInitialLoadingState } from '../uiState/ui-state';
import { postMultipartFormData } from '../../app/api/api-services';
import { COMMON_ENDPOINTS } from '../../app/api/endpoints';
import { showToast } from '../toast/toast';

export interface CloudinaryUploadResponse {
  success: boolean;
  message: string;
  data: {
    url: string;
    public_id: string;
  };
}

type UploadToCloudinaryParams = {
  uri: string;
  type?: string;
};

export const useCloudinaryUpload = () => {
  const defaultUploadState: UiState<CloudinaryUploadResponse | null> = getDefaultUiState();

  const [uploadUiState, setUploadUiState] = useState(defaultUploadState);

  const uploadToCloudinary = async (file: UploadToCloudinaryParams): Promise<{ success: boolean; url?: string }> => {
    setUploadUiState(getInitialLoadingState());

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, '')
      .slice(0, 14);

    const fileName = `profile-${timestamp}.jpg`;

    const formData = new FormData();
    formData.append('image', {
      uri: file.uri,
      name: fileName,
      type: file.type ?? 'image/jpeg',
    } as any);

    try {
      const response: CloudinaryUploadResponse = await postMultipartFormData(
        COMMON_ENDPOINTS.UPLOAD_TO_CLOUDINARY,
        formData,
      );
      const { url } = response?.data || '';
      response?.message && showToast({ text1: response.message });

      setUploadUiState({
        isLoading: false,
        data: response,
        error: undefined,
      });

      return { success: true, url: url };
    } catch (error) {
      showApiErrorMessage(error);

      setUploadUiState({
        isLoading: false,
        data: null,
        error: error,
      });

      return { success: false };
    }
  };

  return {
    uploadUiState,
    uploadToCloudinary,
  };
};
