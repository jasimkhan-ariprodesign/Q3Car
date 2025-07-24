import {
  launchImageLibrary,
  ImageLibraryOptions,
  PhotoQuality,
  MediaType,
} from 'react-native-image-picker';
import {logger} from '..';

// Define the options interface for the utility function
interface LaunchGalleryOptions {
  mediaType?: MediaType;
  quality?: PhotoQuality;
  maxWidth?: number;
  maxHeight?: number;
}

export const launchGalleryUtil = async (
  options: LaunchGalleryOptions = {},
): Promise<string | null> => {
  try {
    // Default options
    const defaultOptions: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 0.5 as PhotoQuality,
      maxWidth: 360,
      maxHeight: 360,
    };

    // Merge default options with custom options
    const launchOptions: ImageLibraryOptions = {
      ...defaultOptions,
      ...options,
    };

    const response = await launchImageLibrary(launchOptions);

    if (response?.didCancel) {
      logger.log('User cancelled image selection.');
      return null;
    }

    if (response?.errorCode || response?.errorMessage) {
      const errorMessage = response.errorMessage || response.errorCode;
      logger.log('Error selecting image:', errorMessage);
      //   _flash_message({
      //     message: 'Failled',
      //     description: errorMessage,
      //     type: 'danger',
      //   });
      return null;
    }

    if (response?.assets && response?.assets?.length > 0) {
      const selectedImageURI = response.assets[0].uri;
      if (!selectedImageURI) {
        logger.log('Selected image URI is undefined.');
        // _flash_message({message: 'No image URI found', type: 'danger'});
        return null;
      }
      return selectedImageURI;
    }

    // Handle no image selected
    logger.log('No image selected.');
    return null;
  } catch (error) {
    logger.log('Unexpected error in launchGalleryUtil:', error);
    return null;
  }
};
