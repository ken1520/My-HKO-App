import React, { Component } from 'react'
import {
  SafeAreaView, StyleSheet, Dimensions, Image, View, ScrollView, RefreshControl, Alert
} from 'react-native'
import {
  Text, H1, H2, H3, Card, CardItem, Grid, Row, Col, Icon, Button
} from 'native-base'
import axios from 'axios'
import config from '../config/setting'
import Modal from 'react-native-modal'
import CloseModalBtn from '../components/CloseModalBtn'
import MainScreenBtn from '../components/MainScreenBtn'
const { height, width } = Dimensions.get('window')
import dateFormat from 'dateformat'

export default class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
      isMorning: '',
      localWeather: '',
      currentWeather: '',
      specialTips: undefined,
      swtModalVisible: false,
      refreshing: false,
    }
    this.getLocalWeather()
    this.getCurrentWeather()
    this.getSpecialTips(1)
    this.handleDate()
  }

  getCurrentWeather = () => {
    axios.get(`${config.hkoapi}weather.php?dataType=rhrread&lang=en`)
      .then((response) => {
        this.setState({ currentWeather: response.data })
      })
      .catch((error) => {
        Alert.alert(config.alertbox_header, error)
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

  getLocalWeather = () => {
    axios.get(`${config.hkoapi}weather.php?dataType=flw&lang=en`)
      .then((response) => {
        this.setState({ localWeather: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  getSpecialTips = (option) => {
    axios.get(`${config.hkoapi}weather.php?dataType=swt&lang=en`)
      .then((response) => {
        this.setState({ specialTips: response.data })
        // option 1: for fetching data when opening the app
        // option 2: for fetching data when pressing the button
        if (option === 2) {
          this.setState({ swtModalVisible: true })
        } else {
          if (response.data.swt.length > 0) {
            this.setState({ swtModalVisible: true })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onRefresh = () => {
    this.getLocalWeather()
    this.getCurrentWeather()
    this.getSpecialTips(1)
    this.handleDate()
  }

  render () {
    const {
      date,
      currentWeather,
      localWeather,
      specialTips,
      swtModalVisible,
      refreshing
    } = this.state

    return (
      <SafeAreaView style={styles.container}>
        {
          this.state.isMorning ?
          <Image style={styles.bg} source={require('../images/morning.jpg')} /> :
          <Image style={styles.bg} source={require('../images/dark.jpg')} />
        }

        <H1>My Hong Kong Observatory</H1>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <Card style={styles.mainCardContainer}>
            <H2>{dateFormat(date, 'yyyy-mm-dd')}</H2>
            <Image style={styles.weatherIcon}
              source={{uri: `https://www.hko.gov.hk/images/wxicon/pic${currentWeather.icon}.png`}}
            />
            <CardItem>
            <Grid>
              <Col style={styles.center}>
                <Icon type='Ionicons' name='md-thermometer' />
                <H1 style={styles.mainStat}>
                  {
                    (currentWeather && currentWeather.temperature.data[0].value) ?
                    (currentWeather && currentWeather.temperature.data[0].value) :
                    '--'
                  }
                  °{currentWeather && currentWeather.temperature.data[0].unit}
                </H1>
              </Col>
              <Col style={styles.center}>
                <Icon type='Ionicons' name='ios-water' />
                <H1 style={styles.mainStat}>
                  {(currentWeather && currentWeather.humidity.data[0].value) ?
                    (currentWeather && currentWeather.humidity.data[0].value) :
                    '--'
                  }%
                </H1>
              </Col>
            </Grid>
            </CardItem>
            {
              (specialTips && specialTips.swt.length > 0) && (
                <CardItem>
                  <Button iconLeft danger
                    onPress={() => this.getSpecialTips(2)}>
                    <Icon type='Ionicons' name='md-alert' />
                    <Text>Special Weather Tips</Text>
                  </Button>
                </CardItem>
              )
            }
          </Card>
          <Grid>
            <MainScreenBtn icon='radio-tower'
              buttonText='9-Day Forecast'
              type='Octicons'
              action={() => this.props.navigation.navigate('WeatherForecast')} />

            <MainScreenBtn icon='water'
              buttonText='Rainfall'
              type='Entypo'
              action={() => this.props.navigation.navigate('RainFall')} />
          </Grid>

          <Card style={styles.mainCardContainer}>
            <CardItem>
              <Text>{this.state.localWeather.generalSituation}</Text>
            </CardItem>
          </Card>

          <Card style={styles.mainCardContainer}>
            <CardItem style={{ flexDirection: 'column' }}>
              <H3>{this.state.localWeather.forecastPeriod}</H3>
              <Text>
                {'\n'}{this.state.localWeather.forecastDesc}{'\n'}
              </Text>
              <Text>{this.state.localWeather.outlook}</Text>
            </CardItem>
          </Card>

        </ScrollView>

        <Modal
          style={{ margin: 0 }}
          isVisible={swtModalVisible}
          transparent={true}>
          <View style={styles.swtModal}>
            <CloseModalBtn color='black' action={() => { this.setState({ swtModalVisible: !swtModalVisible }) }} />
            <Grid>
              <Row style={styles.center} size={1}>
                <H3>Special Weather Tips</H3>
              </Row>
              <Row style={styles.center} size={5}>
                <Text>
                  {
                    (specialTips && specialTips.swt.length > 0) ?
                    (specialTips && specialTips.swt[0].desc) :
                    'No Special Tips Now'
                  }
                </Text>
              </Row>
              <Row style={styles.center} size={1}>
                <Text>
                  Final Update Time:{' '}
                  {
                    (specialTips && specialTips.swt.length > 0) ?
                    (specialTips && dateFormat(specialTips.swt[0].updateTime, 'yyyy-mm-dd hh:mm:ss')) :
                    '--'
                  }
                </Text>
              </Row>
            </Grid>
          </View>
        </Modal>
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  mainCardContainer: {
    width: width * 0.9,
    alignItems: 'center',
    paddingVertical: 20
  },
  weatherIcon: {
    width: width * 0.1,
    height: width * 0.1,
    marginVertical: 10
  },

  mainStat: {
    alignSelf: 'center'
  },

  swtModal: {
    width: width * 0.9,
    height: height * 0.35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 20
  }
})
