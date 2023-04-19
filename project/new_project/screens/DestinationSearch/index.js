import React, {useState, useEffect} from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Location from 'expo-location';
import styles from './styles.js';
import PlaceRow from "./PlaceRow";
import { TabRouter } from '@react-navigation/native';
import { API_KEY } from '../../secrets.js';
import OptionsComponent from '../../components/SimpleOptions.js';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: Location.lat, lng: Location.lng } },
};


const getPlaceDetails = async (placeId) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${API_KEY}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  const { lat, lng } = data.result.geometry.location;

 return {latitude: lat, longitude: lng};
};

const DestinationSearch = (props) => {


 
  const options = [
    "driving",
    "bicycling"
  ];
  const [coordinate, setCoordinate] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ]);

  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);
  const [transport, setTransport] = useState("");


  // get latitude and longitude for origin and destination

  const handlePlaceId = async (place_id, setLocation) => {
    const placeId = place_id;
    const coords = await getPlaceDetails(placeId);
    setLocation(coords);
  };

  useEffect(() => {

    if (originPlace && destinationPlace && transport){

      const coords = {originPlace, destinationPlace};
      setCoordinate(coords);
      props.navigation.navigate("Map", {start: originPlace, end: destinationPlace, coordinate: coordinate, mode: transport});
    }
    
  }, [originPlace, destinationPlace])

  useEffect(() => {

    console.log(transport);
  }, [transport])
  

  return (
    <SafeAreaView>

      
      <View style={styles.container}>

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            handlePlaceId(data["place_id"], setOriginPlace);
            
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCSNIOELEFXqYqOfI0cz83ixqpMBtuFtOQ',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace]}
          
          
        />

<GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            handlePlaceId(data["place_id"], setDestinationPlace);
           
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {...styles.autocompleteContainer,
                        top: 55,
            },
            //listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCSNIOELEFXqYqOfI0cz83ixqpMBtuFtOQ',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace]}
          
          
        />

      <OptionsComponent options={options} setTransport={setTransport}/>

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />

      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
