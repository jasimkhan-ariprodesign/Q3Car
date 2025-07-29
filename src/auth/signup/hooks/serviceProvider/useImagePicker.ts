import { launchCameraUtil, launchGalleryUtil, logger } from '../../../../utils';

type SourceType = 'Camera' | 'Gallery';

export const useImagePicker = () => {
  const pickImage = async (source: SourceType): Promise<string | null> => {
    try {
      const launchFn = source === 'Camera' ? launchCameraUtil : launchGalleryUtil;
      const uri = await launchFn();

      if (!uri) {
        logger.log('No image selected');
        return null;
      }

      logger.log('Selected image:', uri);
      return uri;
    } catch (error) {
      logger.log('Image Picker Error:', error);
      return null;
    }
  };

  return { pickImage };
};
