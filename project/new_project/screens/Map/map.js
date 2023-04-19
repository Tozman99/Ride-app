import React, {Component, useState, useEffect, styles} from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_KEY, MAP_ID } from '../../secrets';
import MapViewDirections from 'react-native-maps-directions';
import SimpleButton from '../../components/SimpleButton'
import { useRoute } from '@react-navigation/native';


const Map = (props) => {
    
    const route = useRoute();
    const [coordinate, setCoordinate] = useState([]);

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [directions, setDirections] = useState(null);
   
    const handleMapPress = event => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        //setCoordinate({ latitude, longitude });
        if (!startLocation) {
            setStartLocation({latitude, longitude });
            
          } else if (!endLocation) {
            setEndLocation({ latitude, longitude });
          }
    };
    const { coords } = route.params || {};

    useEffect(() => {

      if (route.params != undefined && route.params?.start){
            setStartLocation(route.params["start"]);
            setEndLocation(route.params["end"]);
            setCoordinate([
              {
              latitude: route.params["start"].latitude, 
              longitude: route.params["start"].longitude 
              },
              {
                  latitude: route.params["end"].latitude,
                  longitude: route.params["end"].longitude
              }
          ])
            getDirections();
        }
        console.log(route.params);
    }, [route.params]);

    const getDirections = async () => {

        try{
            const apiKey = API_KEY;
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${route.params["start"].latitude},${route.params["start"].longitude}&destination=${route.params["end"].latitude},${route.params["end"].longitude}&key=${apiKey}`
            const response = await fetch(url);
            const data = await response.json();
            setDirections(data);
            } catch (error) {
              console.error(error);
            }
  };
        

  return (
    <MapView style={stylesMap.container}
      region={{
        latitude: 50.454819,
        longitude: 3.958288,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      //customMapStyle={/* your custom map style */}
      showsUserLocation

      provider={PROVIDER_GOOGLE}
      //onPress={handleMapPress}

    >
        <MapViewDirections
            origin={startLocation}
            destination={endLocation}
            strokeWidth={4}
            apikey={API_KEY}
            strokeColor="#111111"
            mode="WALKING"
            
        />

        <SimpleButton title="Click" onPress={() => {props.navigation.navigate("DestinationSearch")}}/>
      
    </MapView>
  );
};

const stylesMap = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Add flexDirection to align text elements horizontally
      },
      text1: {
        padding: 10, // Add padding to add space around text element
        backgroundColor: 'red', // Add background color to distinguish text elements
        marginBottom: -800,
    },
      text2: {
        padding: 10, // Add padding to add space around text element
        backgroundColor: 'blue', // Add background color to distinguish text elements
        marginBottom: -800,
  
        },

        
})

export default Map;


