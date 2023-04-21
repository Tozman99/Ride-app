import React from 'react'
import { View, TouchableOpacity, Image,  Text, StyleSheet } from 'react-native'
import Map from './map'
import BottomSheet from '../../components/BottomSheet'

const MapContainerScreen = ({navigation}) => {
  return (
      <View style={styles.overlay}>
        {/* slider */}
        <Map navigation={navigation}/>
        <BottomSheet navigation={navigation}/>

      </View>
  )
}


const styles = StyleSheet.create({
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
export default MapContainerScreen;
