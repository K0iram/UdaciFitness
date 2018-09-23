import React from 'react'
import { View, Text, Slider, StyleSheet} from 'react-native'
import { grey } from '../utils/colors'


const UdaciSlider = ({ max, unit, value, step, onChange }) => {
  return (
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        maximumValue={max}
        minimumValue={0}
        value={value}
        step={step}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 24, textAlign: 'center', color: grey}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default UdaciSlider