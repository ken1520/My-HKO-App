import React, { Component } from 'react'
import {
// StyleSheet
// Text,
// View
} from 'react-native'

console.disableYellowBox = true

import MainScreen from './src/screens/MainScreen'
import WeatherForecast from './src/screens/WeatherForecast'

export default class App extends Component {
  render () {
    return (
      <WeatherForecast />
    )
  }
}
