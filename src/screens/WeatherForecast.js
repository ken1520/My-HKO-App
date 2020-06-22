import React, { Component } from 'react'
import {
  SafeAreaView, StyleSheet, Dimensions, Image, View, FlatList, ScrollView, ListItem
} from 'react-native'
import {
  Text, H1, H2, H3, Card, CardItem, Grid, Row, Col, Icon, Button, Left
} from 'native-base'
import axios from 'axios'
import config from '../config/setting'
import ForecastItem from '../components/ForecastItem'
const { height, width } = Dimensions.get('window')
import dateFormat from 'dateformat'

export default class WeatherForecast extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isMorning: true,
      fnd: ''
    }
    this.getWeatherForecast()
  }

  getWeatherForecast = () => {
    axios.get(`${config.hkoapi}weather.php?dataType=fnd&lang=en`)
      .then((response) => {
        console.log(response.data);
        this.setState({ fnd: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render () {
    const {
      fnd,
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        {
          this.state.isMorning ?
          <Image style={styles.bg}
            source={require('../images/morning.jpg')} />
          :
          <Image style={styles.bg}
            source={require('../images/dark.jpg')} />
        }

        <ScrollView>
        <Card style={styles.mainCardContainer}>
          <CardItem style={{ flexDirection: 'column' }}>
            <Text>{fnd.generalSituation}</Text>
          </CardItem>
        </Card>
        <Card style={styles.mainCardContainer}>
          <FlatList
            data={fnd.weatherForecast}
            extraData={this.state}
            refreshing={false}
            renderItem={
              ({ item }) => {
                return (
                <CardItem style={styles.forecastCard}>
                  <Image
                    style={styles.weatherIcon}
                    source={{uri: `https://www.hko.gov.hk/images/wxicon/pic${item.ForecastIcon}.png`}}
                  />
                <View style={styles.forecastTextBlock}>
                    <H3>
                      {item.forecastDate.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')} {item.week}
                    </H3>
                    <Text>
                      {item.forecastMintemp.value}°{item.forecastMintemp.unit} -
                      {item.forecastMaxtemp.value}°{item.forecastMaxtemp.unit}
                    </Text>
                    <Text>{item.forecastWeather}</Text>
                  </View>
                </CardItem>
              ) }
            }
            ListEmptyComponent={this.noattendanceRecord}
            keyExtractor={item => item.forecastDate}
          />
        </Card>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  bg: {
    width: width,
    height: height,
    opacity: 0.7,
    position: 'absolute',
    zIndex: -99
  },
  mainCardContainer: {
    width: width * 0.9,
    alignItems: 'center',
  },
  weatherIcon: {
    width: width * 0.12,
    height: width * 0.12,
    margin: 10
  },
  forecastTextBlock: {
    width: width * 0.6,
    margin: 10,

  },
  forecastCard: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5
  }
})
