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

  return (
    <VStack alignItems="center" bg="gray.700" px={8} pt={4} flex={1}>
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
        fetchDetails={true}
        onPress={(data, details = null) => setOrigin(details.geometry)}
        query={{
          key: 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo',
          language: 'pt-BR', // idioma
        }}
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
            zIndex: 9999,
            width: '90%',
          },
          listView: {
            top: 45.5,
            zIndex: 11,
            position: 'absolute',
            color: 'black',
            backgroundColor: 'white',
          },
          separator: {
            flex: 1,
            height: 2,
            backgroundColor: 'blue',
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 45,
            color: '#5d5d5d',
            fontSize: 16,
            borderWidth: 1,
            zIndex: 9999,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {
            top: 45.5,
            zIndex: 11,
            position: 'absolute',
            color: 'black',
            backgroundColor: 'white',
          },
          separator: {
            flex: 1,
            height: 2,
            backgroundColor: 'blue',
          },
          description: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            fontSize: 14,
            maxWidth: '89%',
          },
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
      <VStack flex={1} width="100%" bottom={'20%'}>
        <GooglePlacesAutocomplete
          placeholder="Destino"
          fetchDetails={true}
          onPress={(data, details = null) => setDestination(details.geometry)}
          query={{
            key: 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo',
            language: 'pt-BR', // idioma
          }}
          autocompletionRequest={{
            bounds: [
              { lat: 50, lng: 50 },
              { lat: 100, lng: 100 },
            ],
            componentRestrictions: {
              country: ['us', 'ca', 'uy'],
            },
          }}
          debounce={200}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              zIndex: 999,
              width: '90%',
            },
            listView: {
              top: 45.5,
              zIndex: 10,
              position: 'absolute',
              color: 'black',
              backgroundColor: 'white',
            },
            separator: {
              flex: 1,
              height: 2,
              backgroundColor: 'blue',
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 45,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 1,
              zIndex: 999,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
            listView: {
              top: 45.5,
              zIndex: 10,
              position: 'absolute',
              color: 'black',
              backgroundColor: 'white',
            },
            separator: {
              flex: 1,
              height: 2,
              backgroundColor: 'blue',
            },
            description: {
              flexDirection: 'row',
              flexWrap: 'wrap',
              fontSize: 14,
              maxWidth: '89%',
            },
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
      </VStack>
      <Button
        text="Endereço atu"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        mt={2}
        bottom={'50%'}
        // startIcon={<Icon as={Ionicons} name="location" size="md" />}
        onPress={() =>
          navigation.navigate('Maps', {
            origin: origin,
            destination: destination,
          })
        }
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
