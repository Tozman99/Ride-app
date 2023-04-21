import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetElement from '../../components/BottomSheet'

const BottomSheetScreen = ({navigation, route}) => {



  return (
      <BottomSheetElement />
  );
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 50,
      borderRadius: 25,
      aspectRatio: 1,
      backgroundColor: 'white',
      opacity: 0.6,
    },
  });

export default BottomSheetScreen;
