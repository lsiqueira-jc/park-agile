import { VStack } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';
export function Maps() {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  useEffect(() => {
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421,
      });
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <VStack flex={1} alignItems="center" px={4} pt={24}>
      <Text>{text}</Text>

      <MapView
        style={{ height: '50%', width: '100%' }}
        provider={PROVIDER_GOOGLE}
        shows
        initialRegion={location}
        region={location}
        zoomTapEnabled={true}
        showsUserLocation={true}
        UserLocation={true}
        loadingEnabled={true}
      >
        {location ? (
          <Marker coordinate={location} title="My location">
            <FontAwesome name="map-marker" size={40} color="#B12A5B" />
          </Marker>
        ) : (
          <Text>erro</Text>
        )}
        {/* <Marker
          coordinate={mapRegion}
          title="Marker"
          identifier="vehiclePosition"
        />
        <Marker
          coordinate={location}
          title="Marker"
          identifier="restaurantPosition"
        /> */}
      </MapView>
    </VStack>
  );
}
