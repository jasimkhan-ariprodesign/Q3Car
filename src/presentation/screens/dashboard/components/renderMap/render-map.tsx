import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { COLORS, COMMON_STYLES, MS } from '../../../../../misc';
import { locationPermission } from '../../../../../utils/permissions';
import { logger, useCurrentLocationAction } from '../../../../../utils';
import { PrimaryLoader } from '../../../../../common';
import { FONTS, ICONS } from '../../../../../assets';
import { GeolocationResponse } from '@react-native-community/geolocation';

interface RenderMapProp {
  loader: boolean;
  locData: GeolocationResponse;
}

const RenderMap = ({ loader, locData }: RenderMapProp) => {
  logger.log('locData : ', JSON.stringify(locData?.coords, null, 2));
  const mapRef: any = useRef(null);
  // const [loader, setLoader] = useState<boolean>(true);

  // const { currentLocationUiState, getLocation } = useCurrentLocationAction();
  // logger.info('currentLocationUiState : ', JSON.stringify(currentLocationUiState, null, 2));
  // const _checkLocationPermission = async () => {
  //   const permission = await locationPermission();
  //   if (permission) {
  //     await getLocation();
  //     setLoader(false);
  //   }
  // };

  // useEffect(() => {
  //   _checkLocationPermission();
  // }, []);

  if (loader) {
    return <PrimaryLoader />;
  }

  if (!locData.coords) {
    return (
      <View style={[COMMON_STYLES.container, COMMON_STYLES.center]}>
        <Text style={styles.string}>Location not available</Text>
      </View>
    );
  }

  // main view
  return (
    <View style={COMMON_STYLES.flex}>
      {locData?.coords && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType="standard"
          showsUserLocation={false}
          showsMyLocationButton={true}
          followsUserLocation={false}
          scrollEnabled={true}
          showsBuildings={true}
          liteMode={false}
          showsTraffic={false}
          showsCompass={true}
          region={{
            latitude: locData.coords?.latitude ?? 0,
            longitude: locData.coords?.longitude ?? 0,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          // mapPadding={{
          //   top: 100,
          //   right: 100,
          //   left: 100,
          //   bottom: 100,
          // }}
          onPress={e => {
            const { latitude, longitude } = e.nativeEvent.coordinate;
            logger.warn('you pressed in map :', latitude, longitude);
          }}
        >
          {locData.coords && (
            <Marker
              coordinate={{
                latitude: locData.coords?.latitude,
                longitude: locData.coords?.longitude,
              }}
            >
              <View>
                <Image source={ICONS.currentLocation} style={styles.markerIcon} resizeMode="contain" />
              </View>
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
};

export default RenderMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerIcon: {
    width: MS(28),
    height: MS(28),
    transform: [{ rotate: '-50deg' }],
  },
  string: {
    color: COLORS.black,
    fontSize: MS(12),
    fontFamily: FONTS.workSansMedium,
    includeFontPadding: false,
  },
});
