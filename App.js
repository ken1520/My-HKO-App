import React from 'react'
import {
  createAppContainer
} from 'react-navigation'
import { Dimensions } from 'react-native'
import { createStackNavigator, StackViewTransitionConfigs } from 'react-navigation-stack'
import MainScreen from './src/screens/MainScreen'
import WeatherForecast from './src/screens/WeatherForecast'
import RainFall from './src/screens/RainFall'
const { height, width } = Dimensions.get('window')
console.disableYellowBox = true;

const MainStackNavigator = createStackNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          elevation: 0,
          height: 0
        }
      })
    },
    WeatherForecast: {
      screen: WeatherForecast,
      navigationOptions: ({ navigation }) => ({
        title: '9-Day Weather Forecast',
        headerStyle: {
          elevation: 5,
          height: height * 0.09
        }
      })
    },
    RainFall: {
      screen: RainFall,
      navigationOptions: ({ navigation }) => ({
        title: 'Rainfall Data',
        headerStyle: {
          elevation: 5,
          height: height * 0.09
        }
      })
    }
  },
  {
    initialRouteName: 'MainScreen',
    // mode: 'card',
    // transitionConfig: () => StackViewTransitionConfigs.SlideFromRightIOS
  }
)

const FAMainStack = createAppContainer(MainStackNavigator)
export default FAMainStack
