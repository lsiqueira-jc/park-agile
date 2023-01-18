import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export function GoogleAutoComplete({ text, notifyChange }) {
  return (
    <GooglePlacesAutocomplete
      placeholder={text}
      onPress={(data, details = null) => {
        console.log(
          '🚀 ~ file: index.jsx:9 ~ GoogleAutoComplete ~ details',
          details.geometry,
        );
        notifyChange(details.geometry.location);
      }}
      minLength={2}
      query={{
        key: 'AIzaSyBVSjEIPkYunZfECcv8v4kXiI1ya1CppMo',
        language: 'pt-br',
      }}
      enablePoweredByContainer={false}
      fetchDetails={false}
      styles={{ listView: { height: 10 } }}
    />

    // <GooglePlacesAutocomplete
    //   placeholder="Pesquisar endereço"
    //   autoFocus={false}
    //   returnKeyType={'default'}
    //   fetchDetails={true}
    //   styles={{
    //     // textInputContainer: {
    //     //   backgroundColor: 'grey',
    //     // },
    //     textInput: {
    //       height: 38,
    //       color: '#5d5d5d',
    //       fontSize: 16,
    //     },
    //     predefinedPlacesDescription: {
    //       color: '#1faadb',
    //     },
    //   }}
    //   minLength={2}
    //   // autoFocus={true}
    //   // returnkeyType={'search'}
    //   // listViewDisplayed={false}
    //   // fetchDetails={true}
    //   query={{
    //     key: 'AIzaSyCWX2z45TX88xsqIrwHmxNj52zJW7SK8Gw',
    //     language: 'pt',
    //     // components: 'country:br',
    //   }}
    //   currentLocation={true}
    //   currentLocationLabel="Current location"
    //   // nearbyPlacesAPI="GooglePlacesSearch"
    //   // debounce={200}
    //   // textInputProps={{
    //   //   InputComp: Input,
    //   //   leftIcon: { type: 'font-awesome', name: 'chevron-left' },
    //   //   errorStyle: { color: 'red' },
    //   // }}
    //   nearbyPlacesAPI="GooglePlacesSearch"
    //   onPress={(data, details = null) => {
    //     console.log(data, details);
    //     // 'details' is provided when fetchDetails = true
    //     props.notifyChange(details.geometry.location);
    //   }}
    //   listViewDisplayed="auto" // true/false/undefined
    //   renderDescription={(row) => row.description}
    //   GooglePlacesSearchQuery={{
    //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
    //     rankby: 'distance',
    //     types: 'food',
    //   }}
    //   filterReverseGeocodingByTypes={[
    //     'locality',
    //     'administrative_area_level_3',
    //   ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   // predefinedPlaces={[homePlace, workPlace]}
    //   debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    // />
  );
}
