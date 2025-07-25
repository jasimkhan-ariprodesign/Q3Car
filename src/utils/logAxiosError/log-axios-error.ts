import { AxiosError } from 'axios';
import logger from '../logger/logger';

export const logAxiosError = (prefix: string, error: AxiosError | any) => {
  if (error?.response) {
    const { status, data } = error.response;
    logger.log(`${prefix} [${status}]:`, data?.messag || data);
  } else {
    logger.log(`${prefix} -: `, error?.message || error?.response);
  }
};
