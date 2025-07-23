import { BASE_URL } from './api';
import { getRequest } from './api/api-services';
import { postRequest } from './api/api-services';
import { putRequest } from './api/api-services';
import { deleteRequest } from './api/api-services';
import { patchRequest } from './api/api-services';

import ApiService from './api/axios-instance';

export {
  BASE_URL,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  patchRequest,
};

export default ApiService;
