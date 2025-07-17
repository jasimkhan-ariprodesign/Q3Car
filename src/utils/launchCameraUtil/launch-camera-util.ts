import {launchCamera, CameraOptions, PhotoQuality, MediaType} from 'react-native-image-picker';
import {logger} from '..';

// Define the options interface for the utility function
interface LaunchCameraOptions {
  mediaType?: MediaType;
  quality?: PhotoQuality;
  maxWidth?: number;
  maxHeight?: number;
  saveToPhotos?: boolean; // Additional camera-specific option
  cameraType?: 'back' | 'front';
}

export const launchCameraUtil = async (
  options: LaunchCameraOptions = {},
): Promise<string | null> => {
  try {
    // Default options
    const defaultOptions: CameraOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.5 as PhotoQuality,
      maxWidth: 360,
      maxHeight: 360,
      saveToPhotos: false,
      cameraType: 'back',
    };

    // Merge default options with custom options
    const launchOptions: CameraOptions = {
      ...defaultOptions,
      ...options,
    };

    const response = await launchCamera(launchOptions);

    if (response?.didCancel) {
      logger.info('User cancelled camera operation.');
      return null;
    }

    if (response?.errorCode || response?.errorMessage) {
      const errorMessage = response.errorMessage || response.errorCode;
      logger.log('Camera error:', errorMessage);

      //   _flash_message({
      //     message: 'Failled',
      //     description: errorMessage,
      //     type: 'danger',
      //   });
      return null;
    }

    if (response?.assets && response.assets.length > 0) {
      const capturedImageURI = response.assets[0].uri;
      if (!capturedImageURI) {
        logger.log('Captured image URI is undefined.');
        // _flash_message({message: 'No image URI found', type: 'danger'});
        return null;
      }
      return capturedImageURI;
    }

    logger.info('No image was captured.');
    return null;
  } catch (error) {
    logger.log('Unexpected error in launchCameraUtil:', error);
    return null;
  }
};
