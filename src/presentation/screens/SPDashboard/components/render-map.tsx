import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { COMMON_STYLES } from '../../../../misc';

const RenderMap = () => {
  return (
    <View style={COMMON_STYLES.flex}>
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        showsUserLocation={true}
        style={COMMON_STYLES.flex}
      />
    </View>
  );
};

export default RenderMap;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
});
