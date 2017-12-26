import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import ReactCntdwn from './ReactCntdwn'

class Countdown extends Component {
  static propTypes = {
    birthDate: PropTypes.string,
    lifeExpectancy: PropTypes.number
  }

  render() {
    if (this.props.birthDate && this.props.lifeExpectancy) {

      const target = moment(this.props.birthDate, 'YYYY-MM-DD')
        .add(this.props.lifeExpectancy, 'years')
        .toDate()

      return (
        <ReactCntdwn
          targetDate={target}
          interval={1000}
          leadingZero
        />
      )
    }
    else {
      return (
        <h1>Countdown Not Ready</h1>
      )
    }
  }
}

export default Countdown
