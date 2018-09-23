import React from 'react'
import { View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TabNavigation from './components/TabNavigation'
import { Constants } from 'expo'
import { purple } from './utils/colors'

const UdaciStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content'/>
          <TabNavigation/>
        </View>
      </Provider>
    )
  }
}
