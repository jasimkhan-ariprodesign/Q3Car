export interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
  [key: string]: any; // to support extra fields
}

/**
 * Uploads an image to your backend Cloudinary API endpoint with a custom name.
 * @param file The image object with uri, type (from image picker or camera)
 * @param endpoint Backend API endpoint to handle upload to Cloudinary
 * @returns Cloudinary response object
 */
export const uploadToCloudinary = async (
  file: { uri: string; type: string },
  endpoint: string = 'http://192.168.9.112:9000/api/v1/upload-to-cloudinary',
): Promise<CloudinaryUploadResponse> => {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:\.Z]/g, '')
    .slice(0, 14); // e.g. 20250723153459

  const fileName = `profile-${timestamp}.jpg`;

  const formData = new FormData();
  formData.append('image', {
    uri: file.uri,
    name: fileName,
    type: file.type,
  } as any); // `as any` to fix React Native FormData typing

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Cloudinary Upload Error:', error.message);
    throw error;
  }
};
