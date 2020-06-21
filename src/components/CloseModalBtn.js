import React, { Component } from 'react'
import { Text, View, Button, Icon } from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default class CloseModalBtn extends Component {
  render () {
    const {
      action,
      color
    } = this.props

    return (
      <Button transparent
        style={styles.closeBtn}
        onPress={action}
      >
        <Icon type='FontAwesome' name='times-circle' style={{ color: color }} />
      </Button>
    )
  }
}

CloseModalBtn.propTypes = {
  action: PropTypes.func.isRequired,
  color: PropTypes.string,
}

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99
  }
})
