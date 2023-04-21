import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Map from './screens/Map/map'
import MapContainerScreen from './screens/Map/mapContainer';
import DemoScreen from '../new_project/screens/DemoScreen/DemoScreen'
import DestinationSearch from './screens/DestinationSearch';
import * as Location from 'expo-location';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomSheet from '../new_project/components/BottomSheet'

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
      <Stack.Screen 
          name="demo"  
          component={DemoScreen} 
          options={{headerShown: false}}
          />
        <Stack.Screen name="Map" component={MapContainerScreen} options={{headerShown: false}} />
        <Stack.Screen name="DestinationSearch" component={DestinationSearchScreen} options={{headerShown: false}}/>
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







const stylesMapContainer = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });


export default App;