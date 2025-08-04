import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { COLORS, COMMON_STYLES, MS } from '../../../../../misc';
import { logger } from '../../../../../utils';
import { PrimaryLoader } from '../../../../../common';
import { FONTS, ICONS } from '../../../../../assets';

interface RenderMapProp {
  loader: boolean;
  locData: GeolocationResponse;
}

const RenderMap = ({ loader, locData }: RenderMapProp) => {
  logger.log('locData : ', JSON.stringify(locData, null, 2));
  const latitudeDelta = 0.006;
  const longitudeDelta = 0.006;

  const mapRef = useRef<MapView>(null);

  const _goToMyLocation = () => {
    if (mapRef.current && locData?.coords) {
      mapRef.current.animateToRegion(
        {
          latitude: locData.coords.latitude,
          longitude: locData.coords.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
        1000, // 1000ms animation duration
      );
    }
  };

  const _renderGoToMylocationButton = () => {
    return (
      <TouchableOpacity style={styles.goToMylocationBTN} onPress={_goToMyLocation}>
        <Image source={ICONS.goToMylocation} style={COMMON_STYLES.size24} resizeMode="contain" tintColor={COLORS.primary} />
      </TouchableOpacity>
    );
  };

  if (loader) {
    return <PrimaryLoader />;
  }

  if (!locData?.coords) {
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
        <>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            mapType="standard"
            showsUserLocation={false}
            showsMyLocationButton={false}
            followsUserLocation={false}
            scrollEnabled={true}
            showsBuildings={false}
            liteMode={false}
            showsTraffic={false}
            showsCompass={false}
            region={{
              latitude: locData.coords?.latitude ?? 0,
              longitude: locData.coords?.longitude ?? 0,
              latitudeDelta: 0.006,
              longitudeDelta: 0.006,
            }}
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
                  <Image source={ICONS.curLocation} style={styles.markerIcon} resizeMode="contain" />
                </View>
              </Marker>
            )}
          </MapView>

          {/* go to my location button */}
          {_renderGoToMylocationButton()}
        </>
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
  goToMylocationBTN: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 1,
    width: MS(44),
    height: MS(44),
    borderRadius: MS(22),
    alignItems: 'center',
    justifyContent: 'center',
    right: MS(20),
    bottom: MS(20),
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
