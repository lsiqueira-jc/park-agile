import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as Location from 'expo-location';
import {
  Box,
  Button,
  Flex,
  Heading,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import _ from 'underscore';

export function Maps({ route, navigation }) {
  const { origin, destination } = route.params;
  const [showModal, setShowModal] = useState(false);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [makers, setMakers] = useState({});
  const [mapRegion, setmapRegion] = useState({
    latitude: -19.9393764,
    longitude: -43.9386558,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  // const destination = { latitude: 37.771707, longitude: -122.4053769 };
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo';
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    const getRadius = async () => {
      const radius = 5 * 100;
      const lat = destination.location.lat;
      const long = destination.location.lng;

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=${radius}&type=parking&key=${GOOGLE_MAPS_APIKEY}`;

      console.log('🚀 ~ file: index.jsx:40 ~ useEffect ~ url', url);
      const teste = await axios
        .get(url)
        .then((res) => {
          console.log(
            '🚀 ~ file: index.jsx:44 ~ .then ~ res',
            res.data.results,
          );
          let places = [];
          const testes = _.map(res.data.results, (googlePlace) => {
            // console.log('aaaabbbbb', googlePlace)÷;
            var place = {};
            var myLat = googlePlace.geometry.location.lat;
            var myLong = googlePlace.geometry.location.lng;
            var coordinate = {
              latitude: myLat,
              longitude: myLong,
            };
            place['placeTypes'] = googlePlace.types;
            place['coordinate'] = coordinate;
            place['placeId'] = googlePlace.place_id;
            place['placeName'] = googlePlace.name;
            place['openNow'] = googlePlace.opening_hours;
            place['photos'] = googlePlace.photos;
            place['addres'] = googlePlace.vicinity;
            places.push(place);
          });

          setMakers(places);
        })
        .catch((e) => {
          console.log('erro', e);
        });
    };
    getRadius();
  }, []);

  return (
    <>
      <ScrollView width="full" height={'full'}>
        <VStack flex={1}>
          <MapView
            style={{ height: 400, width: '100%' }}
            provider={PROVIDER_GOOGLE}
            // shows
            region={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            initialRegion={mapRegion}
            // zoomTapEnabled={true}
            zoomEnabled={true}
            showsUserLocation={true}
            UserLocation={true}
            loadingEnabled={true}
            mapType={'standard'}
            userLocationUpdateInterval="500"
            followsUserLocation={true}
            // showsTraffic={true}
            // liteMode={false}
            userInterfaceStyle={'dark'}
            minZoomLevel={1}
            // maxZoomLevel={20}
            showsIndoors={true}
            showsIndoorLevelPicker={true}
            rotateEnabled={true}
          >
            {_.map(makers, (maker, key) => {
              return (
                <Marker
                  key={key}
                  coordinate={{
                    latitude: maker.coordinate.latitude,
                    longitude: maker.coordinate.longitude,
                  }}
                  title={maker.placeName}
                  identifier="restaurantPosition"
                ></Marker>
              );
            })}
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Seu destino"
              identifier="restaurantPosition"
            />
            {/* <MapViewDirections
        origin={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        destination={{
          latitude: destination.location.lat,
          longitude: destination.location.lng,
        }}
        apikey={GOOGLE_MAPS_APIKEY}
      /> */}
          </MapView>
          <VStack
            alignItems="center"
            bg="gray.700"
            px={2}
            pt={4}
            flex={1}
            width={'full'}
          >
            <Heading color="secondary.700" fontSize="xl" mb={6}>
              Estacionamentos disponíveis
            </Heading>
            {_.map(makers, (maker, key) => {
              return (
                <Box
                  key={key}
                  border="2"
                  borderRadius="md"
                  bg={'gray.500'}
                  _text={{
                    color: 'white',
                  }}
                  width={'full'}
                  mb={3}
                  justifyContent="space-between"
                  onPress={() =>
                    navigation.navigate('ConfirmReserv', {
                      marker: maker,
                    })
                  }
                >
                  <VStack
                    space="4"
                    px={4}
                    py={1}
                    _text={{
                      color: 'white',
                    }}
                    onPress={() =>
                      navigation.navigate('ConfirmReserv', {
                        marker: maker,
                      })
                    }
                  >
                    <Box
                      px="4"
                      _text={{
                        color: 'white',
                      }}
                    >
                      <Heading color="white" fontSize="xl" mb={3} mt={4}>
                        {maker.placeName}
                      </Heading>
                      <Text color="gray.200" mb={3}>
                        {maker.addres}
                      </Text>
                      <Flex direction="row" justifyContent={'space-between'}>
                        <Flex direction="row" mb={4} alignItems="center">
                          <AntDesign name="star" size={24} color="#FBA94C" />
                          <Text
                            color="gray.200"
                            ml={2}
                            fontSize="16"
                            fontWeight={'bold'}
                          >
                            4.5
                          </Text>
                        </Flex>
                        <Button
                          onPress={() =>
                            navigation.navigate('ConfirmReserv', {
                              marker: maker,
                            })
                          }
                        >
                          reserva
                        </Button>
                      </Flex>
                    </Box>
                  </VStack>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
}
