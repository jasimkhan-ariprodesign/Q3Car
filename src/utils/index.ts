// sare function rahenge jaise - custom hooks, permission functions etc
import _logger from './logger/logger';
import { _hanldeOpenUrlFunc } from './openUrlFunc/open-url-func';
import { launchGalleryUtil } from './launchGalleryUtil/launch-gallery-util';
import { getDefaultUiState } from './uiState/ui-state';
import { getInitialLoadingState } from './uiState/ui-state';
import { launchCameraUtil } from './launchCameraUtil/launch-camera-util';
import { getTokenUtil } from './getTokenUtil/get-token-util';
import { logAxiosError } from './logAxiosError/log-axios-error';
import { appAlert } from './appAlert/app-alert';
import { showToast } from './toast/toast';
import { useCountDownTimer } from './useCountDownTimer/count-down-timer';
import { showApiErrorMessage } from './showApiErrorMessage/show-api-error-message';
import { storeUserData } from './authStorage/auth-storage';
import { getUserData } from './authStorage/auth-storage';
import { resetUserData } from './authStorage/auth-storage';
import { resetNestedNavigation } from './resetNestedNavigation/reset-nested-navigation';
// import

export {
  _logger as logger,
  _hanldeOpenUrlFunc,
  launchGalleryUtil,
  launchCameraUtil,
  getTokenUtil,
  logAxiosError,
  showToast,
  appAlert,
  useCountDownTimer,
  showApiErrorMessage,
  resetNestedNavigation,
};

export { storeUserData, getUserData, resetUserData };

export { getDefaultUiState, getInitialLoadingState };
