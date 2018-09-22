import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { white, purple } from '../utils/colors'

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
    >
      <Text style={styles.submitBtnTxt}>
        Submit
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginRight: 40,
    marginLeft: 40
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2,
    height: 45,
    paddingRight: 30,
    paddingLeft: 30,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtnTxt: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

export default SubmitBtn