import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import SubmitBtn from './SubmitBtn'
import TextBtn from './TextBtn'
import { submitEntry, removeEntry } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'
import { white } from '../utils/colors'
import { NavigationActions } from 'react-navigation'



class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    eat: 0,
    sleep: 0
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((prevState) => {
      const count = prevState[metric] + step

      return {
        ...prevState,
        [metric]: count > max ? max : count
      }
    })
  }

  decrement = (metric) => {
    this.setState((prevState) => {
      const count = prevState[metric] - getMetricMetaInfo(metric).step

      return {
        ...prevState,
        [metric]: count < 0 ? 0 : count
      }
    })
  }

  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.onSubmit(key, entry)

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      eat: 0,
      sleep: 0
    }))

    this.toHome()

    submitEntry({ key, entry})

    clearLocalNotification()
      .then(setLocalNotification())
  }

  reset = () => {
    const key = timeToString()

    this.props.onReset(key)

    this.toHome()

    removeEntry(key)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if(this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'} size={100}/>
          <Text>You Already Logged Today</Text>
          <TextBtn style={{padding: 10}} onPress={this.reset}>
            Reset
          </TextBtn>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ?
                <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                />
                :
                <UdaciSteppers
                  value={value}
                  onIncrement={() => {this.increment(key)}}
                  onDecrement={() => {this.decrement(key)}}
                  {...rest}
                />
              }

            </View>
          )
        })}
        <SubmitBtn onPress={this.submit}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'

  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
    marginLeft: 30
  }
})

const mapStateToProps = (state) => {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (key, entry) => dispatch(addEntry({
      [key]: entry
    })),
    onReset: (key) => dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry)