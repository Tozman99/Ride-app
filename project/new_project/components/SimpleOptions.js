import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const OptionsComponent = ({ options, setTransport }) => {

  const Image_1 = require("../assets/car.jpeg");
  const bicycleImage_2 = require("../assets/bicycle.jpg");
  const trotImage_3 = require("../assets/trotinette.jpg");
  setTransport("driving");

  return (

    {/*
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setTransport(option)}
        >
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
      */}
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 200,
    position: "relative"
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    
    
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OptionsComponent;
