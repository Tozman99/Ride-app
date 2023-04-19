import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Map from './screens/Map/map'
import DestinationSearch from './screens/DestinationSearch';
import * as Location from 'expo-location';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();

const MapScreen = ({navigation}) => {
  return (
    
      <Map navigation={navigation}/>    
  )
}

const DestinationSearchScreen = ({navigation}) => {

  return (

    <DestinationSearch navigation={navigation} />
  )
}
const App = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


export default App;