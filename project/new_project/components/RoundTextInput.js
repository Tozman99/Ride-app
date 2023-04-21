import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import styles from '../screens/DestinationSearch/styles';

const RoundedTextInput = (props, {onClick}) => {
  return (


    <TextInput
      {...props}
      style={{
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 50,
        
      }}
      placeholder="Where to ?"
      onClick={onClick}
    />
  
  );
};

export default RoundedTextInput;