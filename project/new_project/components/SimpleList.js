import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';


const List = (props) => {

    console.log(props.items, props.items.length, "The list");

  return (
    <View>
      {props.items.map(({mode, time, distance}) => (
        <View style={styles.container}>
          <Text style={styles.element}>By {mode} you would need {time} to do {distance}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', // Add flexDirection to align text elements horizontally
      },
      element: {
        paddingTop: 5,
      }
})

export default List;