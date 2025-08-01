import { useState } from 'react';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../uiState/ui-state';
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';
import { logger } from '..';
import { isIOS } from '../../misc';
import { CommonSuccessReturnType } from '../entities/commonEntities/common-entities';

interface getLocationProp {
  enableHighAccuracy?: boolean;
}

export const useCurrentLocationAction = () => {
  const defaultCurrentLocationState: UiState<any> = getDefaultUiState();
  const [currentLocationUiState, setCurrentLocationUiState] = useState<UiState<any>>(defaultCurrentLocationState);

  const getLocation = async ({
    enableHighAccuracy = isIOS() || false,
  }: getLocationProp = {}): Promise<CommonSuccessReturnType> => {
    setCurrentLocationUiState(getInitialLoadingState());

    try {
      const position = await new Promise<GeolocationResponse>((resolve, reject) => {
        //    Geolocation.setRNConfiguration({
        //   skipPermissionRequests: true,
        //   authorizationLevel: 'always',
        //   enableBackgroundLocationUpdates: true,
        //   locationProvider: 'auto',
        // });

        Geolocation.getCurrentPosition(
          pos => resolve(pos),
          err => reject(err),
          { enableHighAccuracy, timeout: 30000, maximumAge: 60000 },
        );
      });

      // logger.log('current position: ', position);

      setCurrentLocationUiState({
        isLoading: false,
        data: position as GeolocationResponse,
        error: undefined,
      });
      return { success: true };
    } catch (error) {
      setCurrentLocationUiState({
        isLoading: false,
        data: undefined,
        error: error as GeolocationError,
      });
      return { success: false };
    }
  };

  return {
    currentLocationUiState,
    getLocation,
  };
};
