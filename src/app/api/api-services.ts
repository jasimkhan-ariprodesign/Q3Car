import { logger } from '../../utils';
import ApiService, { commonHeader } from './axios-instance';

type CustomHeaderType = Partial<Record<string, string>> & {
  requiresAuth?: boolean;
};

// === GET REQUEST ===

// export const getRequest = async (
//   endpoint: string,
//   customHeaders: CustomHeaderType = {},
// ) => {
//   try {
//     const { requiresAuth, ...restHeaders } = customHeaders;
//     const headers = { ...commonHeader, ...restHeaders };
//     const config = {
//       headers,
//       requiresAuth: requiresAuth ?? true,
//     };

//     const response = await ApiService.api.get(endpoint, config as any);
//     return response.data;
//   } catch (error: any) {
//     // logger.log('GET Request Error:', error?.response || error);
//     throw error?.response ?? error;
//   }
// };

// Add `params` as an optional argument
export const getRequest = async (
  endpoint: string,
  customHeaders: CustomHeaderType = {},
  params?: Record<string, any>
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;

    const headers = { ...commonHeader, ...restHeaders };

    const config = {
      headers,
      params, // ⬅️ query parameters go here
      requiresAuth: requiresAuth ?? false,
    };

    const response = await ApiService.api.get(endpoint, config as any);
    return response.data;
  } catch (error: any) {
    throw error?.response ?? error;
  }
};


// === POST REQUEST ===
export const postRequest = async (
  endpoint: string,
  body: any,
  customHeaders: CustomHeaderType = {},
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;
    const headers = { ...commonHeader, ...restHeaders };
    const config = {
      headers,
      requiresAuth: requiresAuth ?? false,
    };

    const response = await ApiService.api.post(endpoint, body, config as any);
    return response.data;
  } catch (error: any) {
    // logger.log('POST Request Error:', error?.response || error);
    throw error?.response ?? error;
  }
};

// === PUT REQUEST ===
export const putRequest = async (
  endpoint: string,
  body: any,
  customHeaders: CustomHeaderType = {},
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;
    const headers = { ...commonHeader, ...restHeaders };
    const config = {
      headers,
      requiresAuth: requiresAuth ?? true,
    };

    const response = await ApiService.api.put(endpoint, body, config as any);
    return response.data;
  } catch (error: any) {
    // logger.log('PUT Request Error:', error?.response || error);
    throw error?.response ?? error;
  }
};

// === DELETE REQUEST ===

export const deleteRequest = async (
  endpoint: string,
  customHeaders: CustomHeaderType = {},
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;

    const headers: Record<string, string> = {
      ...commonHeader,
      ...restHeaders,
    };

    const config = {
      headers,
      requiresAuth: requiresAuth ?? true,
    };

    const response = await ApiService.api.delete(endpoint, config);
    return response.data;
  } catch (error: any) {
    // logger.log('DELETE Request Error:', error?.response || error);
    throw error?.response ?? error;
  }
};

// === PATCH REQUEST ===

export const patchRequest = async (
  endpoint: string,
  body: any,
  customHeaders: CustomHeaderType = {},
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;

    const headers: Record<string, string> = {
      ...commonHeader,
      ...restHeaders,
    };

    const config = {
      headers,
      requiresAuth: requiresAuth ?? true,
    };

    const response = await ApiService.api.patch(endpoint, body, config);
    return response.data;
  } catch (error: any) {
    // logger.log('PATCH Request Error:', error?.response || error);
    throw error?.response ?? error;
  }
};

// === POST REQUEST ===

export const postMultipartFormData = async (
  endpoint: string,
  formData: FormData,
  customHeaders: CustomHeaderType = {},
) => {
  try {
    const { requiresAuth, ...restHeaders } = customHeaders;

    const headers: Record<string, string> = {
      ...restHeaders,
      'Content-Type': 'multipart/form-data',
    };

    const config = {
      headers,
      requiresAuth: requiresAuth ?? false,
    };

    const response = await ApiService.api.post(endpoint, formData, config);
    return response.data;
  } catch (error: any) {
    // logger.log('Multipart POST Error:', error?.response || error);
    throw error?.response ?? error;
  }
};
