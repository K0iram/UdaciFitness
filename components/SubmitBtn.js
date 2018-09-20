import React from 'react'
import { Text, TouchableOpacity } from 'react-native'


const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>
        Submit
      </Text>
    </TouchableOpacity>
  )
}

export default SubmitBtn