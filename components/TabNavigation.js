import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { purple, white } from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import AddEntry from './AddEntry'
import History from './History'


const TabNavigation =
  Platform.OS === 'ios' ?
    createBottomTabNavigator({
      History: {
        screen: History,
        navigationOptions: {
          tabBarLabel: 'History',
          tabBarIcon: ({ tintColor }) =>
            <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
        }
      },
      AddEntry: {
        screen: AddEntry,
        navigationOptions: {
          tabBarLabel: 'Add Entry',
          tabBarIcon: ({ tintColor }) =>
            <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
      }
    }, {
      navigationOptions: {
        header: null
      }
    },
    {
      tabBarOptions: {
        activeTintColor: purple,
        style: {
          height: 56,
          backgroundColor: white,
          shadowColor: 'rgba(0,0,0,0.24)',
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
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLabel: 'Add Entry',
        tabBarIcon: ({ tintColor }) =>
          <FontAwesome name='plus-square' size={30} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null
    }
  },
  {
    tabBarOptions: {
      activeTintColor: white,
      style: {
        height: 56,
        backgroundColor: purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

export default TabNavigation