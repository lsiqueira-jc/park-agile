import * as Location from 'expo-location';
import { Image, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Wifi from '../../assets/wifi.png';
import { Button } from '../../components/Button';

export function Home({ navigation }) {
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);
  const [hasLocationPermissions, setLocationPermission] = useState(false);
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapDestinRegion, setmapDestinRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getLocationAsync = async () => {
      // let { status } = await Location.getForegroundPermissionsAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      // let { status } = await Permissions.askAsync(
      //   Permissions.LOCATION_FOREGROUND,
      // );
      console.log(
        '🚀 ~ file: index.jsx:28 ~ getLocationAsync ~ status',
        status,
      );
      if (status !== 'granted') {
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
  function getCoordsFromNameDestination(loc) {
    setmapDestinRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  }
  const updateLocation = (data, details = null) => {
    setOrigin(details.geometry);
  };
  console.log('origin', origin);

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={4}>
      {/* <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={15}
        pb={8}
        px={6}
        >
        <Image source={Wifi} />
        <IconButton >
      </HStack> */}
      <Image source={Wifi} />

      <GooglePlacesAutocomplete
        placeholder="Origem"
        onPress={(data, details = null) => setOrigin(details)}
        query={{
          key: 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo',
          language: 'pt-BR', // idioma
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            backgroundColor: '#FFF',
          },
          textInput: {
            height: 44,
            color: '#000',
          },
        }}
      />

      <GooglePlacesAutocomplete
        placeholder="Destino"
        onPress={(data, details = null) => setDestination(details)}
        query={{
          key: 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo',
          language: 'pt-BR', // idioma
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            backgroundColor: '#FFF',
          },
          textInput: {
            height: 44,
            color: '#000',
          },
        }}
      />

      <Button
        text="Endereço atual"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        mt={60}
        // startIcon={<Icon as={Ionicons} name="location" size="md" />}
        onPress={() => navigation.navigate('Maps')}
      />
      {/* <Button
        text="Endereço de destino"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        startIcon={<Icon as={Ionicons} name="location" size="md" />}
        // mt={6}
      /> */}

      {/* <Input placeholder="Endereço de destino" onChangeText={setAddress} /> */}
    </VStack>
  );
}
