import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, COMMON_STYLES, isIOS } from '../../../misc';
import { SafeAreaWrapper } from '../../components';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types/types';
import SPDashboardHeader from './components/sp-dashboard-header';
import RenderMap from './components/render-map';
import OfflineMessageIndicator from './components/offline-message-indicator';
import ContentCont from './components/content-cont';
import { useCurrentLocationAction } from '../../../utils';
import { locationPermission } from '../../../utils/permissions';

const SPDashboardScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const [netStatus, setNetStatus] = useState<'offline' | 'online'>('offline');

  const [mapLoader, setMapLoader] = useState<boolean>(true);
  const { currentLocationUiState, getLocation } = useCurrentLocationAction();

  // logger.info('currentLocationUiState : ', JSON.stringify(currentLocationUiState, null, 2));

  const _checkLocationPermission = async () => {
    const permission = await locationPermission();
    if (permission) {
      // await getLocation();
      setMapLoader(false);
    }
  };

  useEffect(() => {
    _checkLocationPermission();
  }, []);

  const _handleOnlineSwitchClick = () => {
    if (netStatus === 'offline') {
      setNetStatus('online');
    } else {
      setNetStatus('offline');
    }
  };

  const _renderHeader = () => {
    return (
      <>
        <SPDashboardHeader handleOffOn={_handleOnlineSwitchClick} netStatus={netStatus} />
      </>
    );
  };

  const _renderOfflineMessageCont = () => {
    return (
      <>
        <OfflineMessageIndicator />
      </>
    );
  };

  const _renderMap = () => {
    return (
      <View style={styles.mapContainer}>
        <RenderMap loader={mapLoader || currentLocationUiState.isLoading} locData={currentLocationUiState.data} />
      </View>
    );
  };

  const _renderContentCont = () => {
    return (
      <>
        <ContentCont />
      </>
    );
  };

  // main view
  return (
    <>
      <KeyboardAvoidingView style={COMMON_STYLES.flex} behavior={isIOS() ? 'padding' : 'height'}>
        <SafeAreaWrapper>
          {/* header  */}
          {_renderHeader()}

          {/* offline message indicator */}
          {netStatus === 'offline' && _renderOfflineMessageCont()}

          {/* map here */}
          {_renderMap()}

          {/* dashboard content */}
          {_renderContentCont()}
        </SafeAreaWrapper>
      </KeyboardAvoidingView>
    </>
  );
};

export default SPDashboardScreen;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: COLORS.pink,
  },
});
