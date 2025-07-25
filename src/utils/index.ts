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
};

export { getDefaultUiState, getInitialLoadingState };
