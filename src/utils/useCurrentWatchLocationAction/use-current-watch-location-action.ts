import { useEffect, useRef, useState } from 'react';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { getDefaultUiState, getInitialLoadingState, UiState } from '../uiState/ui-state';
import { isIOS } from '../../misc';
import { logger } from '..';

interface WatchLocationOptions {
  enableHighAccuracy?: boolean;
}

export const useCurrentWatchLocationAction = () => {
  const defaultState: UiState<GeolocationResponse> = getDefaultUiState();
  const [currentWatchPositionUiState, setCurrentWatchPositionUiState] = useState<UiState<GeolocationResponse>>(defaultState);

  const watchIdRef = useRef<number | null>(null);

  const startWatching = ({ enableHighAccuracy = isIOS() }: WatchLocationOptions = {}) => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    setCurrentWatchPositionUiState(getInitialLoadingState());

    watchIdRef.current = Geolocation.watchPosition(
      position => {
        // logger.log('Current Watch Position: ', position);
        setCurrentWatchPositionUiState({
          isLoading: false,
          data: position,
          error: undefined,
        });
      },
      error => {
        // logger.log('Watch Position Error:', error);
        setCurrentWatchPositionUiState({
          isLoading: false,
          data: undefined,
          error: error,
        });
      },
      {
        enableHighAccuracy,
        timeout: 20000,
        maximumAge: 60000,
        distanceFilter: 10,
        interval: 20000,
        fastestInterval: 10000,
      },
    );
  };

  const stopWatching = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  // Optional cleanup on unmount
  useEffect(() => {
    return () => stopWatching();
  }, []);

  return {
    currentWatchPositionUiState,
    startWatching,
    stopWatching,
  };
};
