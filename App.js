import React from 'react'
import { View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import TabNavigation from './components/TabNavigation'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}} >
          <TabNavigation/>
        </View>
      </Provider>
    )
  }
}
