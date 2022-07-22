import { Icon, ScrollView, VStack } from 'native-base';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GoogleAutoComplete } from '../GoogleAutoComplete';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { Button } from '../Button';
export function Maps({ navigation }) {
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getLocationAsync = async () => {
      // let { status } = await Location.getForegroundPermissionsAsync();
      let { status } = await Permissions.askAsync(
        Permissions.LOCATION_FOREGROUND,
      );
      if ('granted' !== status) {
        setLocation('Permission to access location was denied');
      } else {
        setLocationPermission(true);
      }

      let {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setLocation(JSON.stringify({ latitude, longitude }));

      // Center the map on the location we just fetched.
      setmapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getLocationAsync();
  }, []);
  if (location === null) {
    return <Text>Finding your current location...</Text>;
  }

  if (hasLocationPermissions === false) {
    return <Text>Location permissions are not granted.</Text>;
  }

  if (mapRegion === null) {
    return <Text>Map region doesn't exist.</Text>;
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function getCoordsFromName(loc) {
    setmapRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  }
  function onMapRegionChange(region) {
    setmapRegion(region);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={4}>
      <VStack flex={1} width="full" zIndex={9}>
        <GoogleAutoComplete notifyChange={(loc) => getCoordsFromName(loc)} />
      </VStack>
      <MapView
        style={{ height: '50%', width: '100%' }}
        provider={PROVIDER_GOOGLE}
        // shows
        region={mapRegion}
        initialRegion={mapRegion}
        zoomTapEnabled={true}
        zoomEnabled={true}
        // showsUserLocation={true}
        UserLocation={true}
        loadingEnabled={true}
        mapType={'mutedStandard'}
        userInterfaceStyle="dark"
        userLocationUpdateInterval="5000"
        followsUserLocation={true}
        showsTraffic={true}
        minZoomLevel={19}
        maxZoomLevel={15}
        onRegionChange={(reg) => onMapRegionChange(reg)}
      >
        {mapRegion ? (
          <Marker coordinate={mapRegion} title="My location">
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
      <Button
        text="Salvar"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="center"
        // startIcon={<Icon as={Ionicons} name="location" size="md" />}
        mt={8}
      />
    </VStack>
  );
}
