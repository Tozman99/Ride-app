import BottomSheet from 'react-native-simple-bottom-sheet';
import React, { useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import RoundTextInput from "./RoundTextInput"

function BottomSheetElement(props) {

    const panelRef = useRef(null);

    return (
    
       
        
        <BottomSheet ref={ref => panelRef.current = ref}>
          <RoundTextInput onFocus={() => {props.navigation.navigate("DestinationSearch")}}/>
        </BottomSheet>
    );
}


export default BottomSheetElement;
