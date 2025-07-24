import { AxiosError } from "axios";
import logger from "../logger/logger";

export const logAxiosError = (prefix: string, error: AxiosError | any) => {
  if (error?.response) {
    const { status, data } = error.response;
    logger.warn(`${prefix} [${status}]:`, data?.message || data);
  } else {
    logger.warn(`${prefix}:`, error?.message || error);
  }
};
