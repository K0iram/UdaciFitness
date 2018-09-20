import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import SubmitBtn from './SubmitBtn'
import TextBtn from './TextBtn'
import { submitEntry, removeEntry } from '../utils/api'
import { Ionicons } from '@expo/vector-icons'


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

    //Update redux

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      eat: 0,
      sleep: 0
    }))

    //Navigate to home

    submitEntry({ key, entry})

    //Save to Database
    //Clear Local Notifications
  }

  reset = () => {
    const key = timeToString()

    removeEntry(key)

    //Update redux
    //Navigate to home
    //Save to Database
  }

  render() {
    const metaInfo = getMetricMetaInfo()

    if(this.props.alreadyLogged) {
      return (
        <View>
          <Ionicons name='ios-happy-outline' size={100}/>
          <Text>You Already Logged Today</Text>
          <TextBtn onPress={this.reset}>
            Reset
          </TextBtn>
        </View>
      )
    }

    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key}>
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

export default AddEntry