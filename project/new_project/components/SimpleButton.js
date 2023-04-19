import React, {useState, useEffect} from 'react'
import { TouchableOpacity, Text, View, Button } from 'react-native';

const SimpleButton = ({title, onPress}) => {


    return (

        <TouchableOpacity onPress={onPress}>

            <Text> {title}</Text>
        </TouchableOpacity>
    );
};


export default SimpleButton;