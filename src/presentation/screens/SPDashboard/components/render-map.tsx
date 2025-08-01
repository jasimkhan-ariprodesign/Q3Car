import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GeolocationResponse } from '@react-native-community/geolocation';
import { ICONS, FONTS } from '../../../../assets';
import { PrimaryLoader } from '../../../../common';
import { COMMON_STYLES, MS, COLORS } from '../../../../misc';
import { logger } from '../../../../utils';

interface RenderMapProp {
  loader: boolean;
  locData: GeolocationResponse;
}

const RenderMap = ({ loader, locData }: RenderMapProp) => {
  // logger.log('locData : ', JSON.stringify(locData?.coords, null, 2));

  const mapRef: any = useRef(null);

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
