import React, {Component, useState, useEffect, styles, useMemo, useRef, useCallback} from 'react';
import { ScrollView, Text, View, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, Geolocation} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_KEY, MAP_ID } from '../../secrets';
import MapViewDirections from 'react-native-maps-directions';
import SimpleButton from '../../components/SimpleButton'
import { useRoute } from '@react-navigation/native';
import List from '../../components/SimpleList'
import { Asset } from 'expo-asset';
import { getDistance } from 'geolib'; // import geolib library to calculate distance
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
} from 'react-native-reanimated';
import { Location } from 'expo-location';


const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return;
  }

  const { coords } = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = coords;

  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
};

const getTimeOfTravel = async (origin, destination) => {
  const modesOfTransport = ['driving', 'transit', 'bicycling', "walking"];
  const transportModesWithTime = [];

  for (let i = 0; i < modesOfTransport.length; i++) {
    const mode = modesOfTransport[i];
    const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=${mode}&departure_time=now&traffic_model=pessimistic&key=${API_KEY}`);
    const data = await response.json();
    const time = data.routes[0].legs[0].duration.text;
    const distance = data.routes[0].legs[0].distance.text;
    transportModesWithTime.push({ mode, time, distance });
  }
  return transportModesWithTime;
}

const readJsonCoordinate = async (endLocation, setintermediateLocation) => {

  try {

          // Load JSON file
    const jsonFile =  require('../../jsonFiles/parkRide.json');
    console.log("endlocation", endLocation);
    let minDistance = Number.MAX_VALUE;
    // Parse JSON to array of coordinate objects
    jsonFile.features.forEach((feature) => {

      const { coordinateMap } = feature;
      // calculate distance between coordinateMap and endLocation
      const distance = getDistance(coordinateMap, endLocation);
      // check if current distance is smaller than the current minimum distance
      if (distance < minDistance) {
        minDistance = distance;
        nearestCoordinateMap = coordinateMap;
        
      }

      
    });
    setintermediateLocation(nearestCoordinateMap);
    console.log(nearestCoordinateMap);
  } catch(error){
    console.log(error);
  }

};


const Map = (props) => {


    
    const route = useRoute();
    const [coordinate, setCoordinate] = useState([]);

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);
    const [directions, setDirections] = useState(null);
    const [displayedInfos, setDisplayInfos] = useState(null);
    const [intermediateLocation, setintermidiateLocation] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    let travelInfo = [];
    let index = 0;
    const mapRef = useRef(null);
    let region = {
      latitude: 50.453330,
      longitude: 3.948740,
      latitudeDelta: 0.1988,
      longitudeDelta: 0.1432,
    };

    const image = require("../../assets/parkingMarker.png");

    const handleMapPress = event => {
        const {latitude, longitude} = event.nativeEvent.coordinate;
        //setCoordinate({ latitude, longitude });
        if (!startLocation) {
            setStartLocation({latitude, longitude });
            
          } else if (!endLocation) {
            setEndLocation({ latitude, longitude });
          }
    };

    const setValues = async (setStartLocation, setEndLocation) => {
      setStartLocation(route.params?.start);
      setEndLocation(route.params?.end);
      console.log(startLocation, endLocation, "VALUES");
    };
    const { coords } = route.params || {};
    
    const memoizedParams = useMemo(() => route.params, [route.params]);
    
    useEffect(() => {
          console.log(memoizedParams, "OK xss \n");
      if (route.params?.start && route.params?.end){

            setStartLocation(memoizedParams.start);
            setEndLocation(memoizedParams.end);
            console.log(endLocation, startLocation, route.params, "OK", route.params.start, route.params.end);

            setCoordinate([
              {
              latitude: route.params["start"].latitude, 
              longitude: route.params["start"].longitude 
              },
              {
                  latitude: route.params["end"].latitude,
                  longitude: route.params["end"].longitude
              }
          ]);


            //verhicle + time
        }
        getLocation();


        if (startLocation != null && endLocation != null){
               region = {
                latitude: (startLocation.latitude + endLocation.latitude)/ 2,
                longitude: (startLocation.longitude + endLocation.longitude)/ 2,
                longitudeDelta: 1.2,
                latitudeDelta: 1.2,
                
              };
              mapRef.current.animateToRegion(region, 1000);
              readJsonCoordinate(endLocation, setintermidiateLocation);
              getDirections();
        }
        
        index += 1;
    }, [startLocation, endLocation, route.params]);

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

          try {
            const travelInfo = await getTimeOfTravel(route.params["start"], route.params["end"]);
            setDisplayInfos(travelInfo);
          
          }catch(error){
            console.log(error);
          }

  };
        

  return (
    <MapView style={stylesMap.container}
      region={region}
      ref={mapRef}
      //customMapStyle={/* your custom map style */}
      showsUserLocation
      customMapStyle={stylesMap.MapStyle}
      provider={PROVIDER_GOOGLE}
      //onPress={handleMapPress}

    >
        <MapViewDirections
            origin={startLocation}
            destination={intermediateLocation}
            strokeWidth={5}
            apikey={API_KEY}
            strokeColor="#800080"
            
        />

          <MapViewDirections
            origin={intermediateLocation}
            destination={endLocation}
            strokeWidth={5}
            apikey={API_KEY}
            strokeColor="blue"
            mode="WALKING"
            
        />
        {startLocation && <Marker pinColor='green' coordinate={{latitude: startLocation.latitude, longitude: startLocation.longitude}}/>}
        {endLocation && <Marker pinColor='red' coordinate={{latitude: endLocation.latitude, longitude: endLocation.longitude}}/>}
        {intermediateLocation && <Marker image={image} coordinate={{latitude: intermediateLocation.latitude, longitude: intermediateLocation.longitude}}/>}

        {/*
        {displayedInfos && <List style={stylesMap.list} items={displayedInfos} length={displayedInfos.length}/>}
      * */}
    
    </MapView>
  );
};


const stylessheet = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

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

      list:{
        padding: 50,
        backgroundColor: "black",
      },
      button: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        
        
      },
      image:{
        width: 50,
        heihgt:50
      },
      

})

export default Map;


