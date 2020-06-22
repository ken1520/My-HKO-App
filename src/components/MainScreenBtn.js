import React, { Component } from 'react'
import { Text, View, Button, Grid, Row, Col, Icon, H1, H2, H3 } from 'native-base'
import { StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
const { height, width } = Dimensions.get('window')

export default class MainScreenButton extends Component {
  render () {
    const {
      buttonText,
      action,
      icon,
      type
    } = this.props

    return (
      <Col>
        <Button block light
          style={styles.btn}
          onPress={action}
        >
          <Grid>
            <Row style={styles.row}><Icon style={styles.icon} type={type} name={icon} /></Row>
            <Row style={styles.row}><H3 style={styles.btnText}>{buttonText}</H3></Row>
          </Grid>
        </Button>
      </Col>
    )
  }
}

MainScreenButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  btn: {
    width: width * 0.42,
    height: height * 0.12,
    justifyContent: 'center',
    margin: 8,
    padding: 8,
    alignSelf: 'center',
    flexDirection: 'column',
    borderRadius: 8
  },
  btnText: {

  },
  row: {
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'black'
  }
})
