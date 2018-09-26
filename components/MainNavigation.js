import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator,createStackNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddEntry from './AddEntry'
import History from './History'
import EntryDetail from './EntryDetail'
import Live from './Live'

const Tabs = Platform.OS === 'ios' ?
  createBottomTabNavigator({
    History: {
      screen: History,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      },
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLabel: 'Live',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
      },
    },
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: purple,
      style: {
        height: 56,
        backgroundColor: white,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })
:
  createMaterialTopTabNavigator({
   History: {
     screen: History,
     navigationOptions: {
       tabBarLabel: 'History',
       tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
     },
   },
   AddEntry: {
     screen: AddEntry,
     navigationOptions: {
       tabBarLabel: 'Add Entry',
       tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
     },
   },
  }, {
   navigationOptions: {
     header: null
   },
   tabBarOptions: {
     activeTintColor: white,
     style: {
       height: 56,
       backgroundColor: purple,
       shadowColor: 'rgba(0, 0, 0, 0.24)',
       shadowOffset: {
         width: 0,
         height: 3
       },
       shadowRadius: 6,
       shadowOpacity: 1
     }
   }
  })

const MainNavigation = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default MainNavigation