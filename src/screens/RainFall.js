import React, { Component } from 'react'
import {
  SafeAreaView, StyleSheet, Dimensions, Image, View, FlatList, ScrollView, RefreshControl
} from 'react-native'
import {
  Text, H1, H2, H3, Card, CardItem, Grid, Row, Col, Icon, Button, Left
} from 'native-base'
import axios from 'axios'
import config from '../config/setting'
import ForecastItem from '../components/ForecastItem'
const { height, width } = Dimensions.get('window')
import dateFormat from 'dateformat'
import { NavigationEvents } from 'react-navigation'

export default class RainFall extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      isMorning: '',
      rainfall: '',
    }
    this.getRainFall()
    this.handleDate()
  }

  getRainFall = () => {
    axios.get(`${config.hkoapi}weather.php?dataType=rhrread&lang=en`)
      .then((response) => {
        this.setState({ rainfall: response.data.rainfall })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleDate = () => {
    let now = new Date()
    this.setState({ date: now })
    var dusk = new Date();
    dusk.setHours(18,30,0); // 6.30 pm
    if (now >= dusk) {
      this.setState({ isMorning: false })
    } else {
      this.setState({ isMorning: true })
    }
  }

  onRefresh = () => {
    this.getRainFall()
    this.handleDate()
  }

  render () {
    const {
      rainfall,
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        {
          this.state.isMorning ?
          <Image style={styles.bg} source={require('../images/morning.jpg')} /> :
          <Image style={styles.bg} source={require('../images/dark.jpg')} />
        }
        <NavigationEvents
          onWillFocus={() => this.handleDate()}
        />
        <Card style={styles.mainCardContainer}>
          <FlatList
            data={rainfall.data}
            extraData={this.state}
            refreshing={false}
            onRefresh={this.onRefresh}
            renderItem={
              ({ item }) => {
                return (
                <CardItem style={styles.forecastCard}>
                  <View style={styles.forecastTextBlock}>
                    <H3>{item.place}</H3>
                    {
                      item.main == 'TRUE' ? <Icon name='tools' type='FontAwesome5' /> :
                      <Text>Max: {item.max} {item.unit}</Text>
                    }
                  </View>
                </CardItem>
              ) }
            }
            ListEmptyComponent={this.noattendanceRecord}
            keyExtractor={item => item.place}
          />
        </Card>
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
    marginBottom: height * 0.05
  },
  forecastTextBlock: {
    width: width * 0.7,
    margin: 10,

  },
  forecastCard: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.5
  }
})
