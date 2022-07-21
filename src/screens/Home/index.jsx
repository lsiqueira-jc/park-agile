import { HStack, VStack, Image, IconButton, Icon, Heading } from 'native-base';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Wifi from '../../assets/wifi.png';
import Logo from '../../assets/logo.png';
import { Input } from '../../components/Input';
import { useState } from 'react';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { Button } from '../../components/Button';
export function Home() {
  const [address, setAddress] = useState('');
  const homePlace = {
    description: 'Home',
    geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
  };
  const workPlace = {
    description: 'Work',
    geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
  };

  return (
    <VStack flex={1} alignItems="center" bg="gray.700" px={8} pt={24}>
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
      {/* <Button
        text="Endereço atual"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        startIcon={<Icon as={Ionicons} name="location" size="md" />}
      />
      <Button
        text="Endereço de destino"
        bg={'gray.500'}
        _text={{
          color: 'gray.200',
        }}
        justifyContent="space-between"
        startIcon={<Icon as={Ionicons} name="location" size="md" />}
        mt={6}
      />

      <Input placeholder="Endereço de destino" onChangeText={setAddress} /> */}
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={12} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={(row) => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyBwvWsTU-3bKPWrVfBslLVKps8vinnqomg',
          language: 'pt', // language of the results
          types: '(city)', // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
        // renderRightButton ={() => <Heading>Custom text after the input</Heading>}
      />
    </VStack>
  );
}
