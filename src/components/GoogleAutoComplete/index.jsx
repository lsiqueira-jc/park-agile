import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export function GoogleAutoComplete(props) {
  console.log(props.notifyChange);
  return (
    <GooglePlacesAutocomplete
      placeholder="Pesquisar endereço"
      autoFocus={false}
      returnKeyType={'default'}
      fetchDetails={true}
      // styles={{
      //   textInputContainer: {
      //     backgroundColor: 'grey',
      //   },
      //   textInput: {
      //     height: 38,
      //     color: '#5d5d5d',
      //     fontSize: 16,
      //   },
      //   predefinedPlacesDescription: {
      //     color: '#1faadb',
      //   },
      // }}
      minLength={2}
      // autoFocus={true}
      // returnkeyType={'search'}
      // listViewDisplayed={false}
      // fetchDetails={true}
      query={{
        key: 'AIzaSyCWX2z45TX88xsqIrwHmxNj52zJW7SK8Gw',
        language: 'pt',
        components: 'country:br',
      }}
      currentLocation={true}
      currentLocationLabel="Localização Atual"
      // nearbyPlacesAPI="GooglePlacesSearch"
      // debounce={200}
      // textInputProps={{
      //   InputComp: Input,
      //   leftIcon: { type: 'font-awesome', name: 'chevron-left' },
      //   errorStyle: { color: 'red' },
      // }}
      onPress={(data, details = null) => {
        console.log(data, details);
        // 'details' is provided when fetchDetails = true
        props.notifyChange(details.geometry.location);
      }}
    />
  );
}
