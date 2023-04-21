import React from 'react'
import { View, TouchableOpacity, Image,  Text } from 'react-native'
import CustomSlider from '../../components/CustomSlider';
import styles from "./styles";
import sliderContent from "./slides";

const DemoScreen = ({navigation, route}) => {
  return (
      <View style={styles.container}>
        {/* slider */}
        <CustomSlider sliderContent={sliderContent} />
        <View style={{ bottom:0, position:'absolute', marginBottom: 10}}>
          <TouchableOpacity 
            style={styles.startBtn}
            i
            onPress={() => navigation.replace('Map')}
            raised title="Register">
            <Text style={styles.startBtnText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default DemoScreen;
