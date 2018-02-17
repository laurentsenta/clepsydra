// https://github.com/sungwoncho/react-cntdwn/blob/master/src/cntdwn.jsx
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './ReactCntdwn.css'

const COUNTDOWN_NOT_STARTED = 1
const COUNTDOWN_STARTED = 2
const COUNTDOWN_FINISHED = 3

const numberWithCommas = (x) => {
  // https://stackoverflow.com/a/2901298/843194
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

const maxFloat = (x, count = null) => {
  if (count == null) {
    return x;
  }

  const parts = x.toString().split(".");

  if (parts.length < 2) {
    return x;
  }

  let newP = parts[1].slice(0, count);
  newP = newP.padEnd(count, '0')
  parts[1] = newP;
  return parts.join('.');
}


export default class Countdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      remainingTime: 0,
      status: COUNTDOWN_NOT_STARTED,
      intervalId: null
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      let timer = setInterval(() => {
        this.tick()
      }, this.props.interval)

      this.setState({
        status: COUNTDOWN_STARTED,
        intervalId: timer
      })

      this.tick()
    }, this.props.startDelay)
  }

  componentWillUnmount = () => {
    clearInterval(this.state.intervalId)
  }

  calculateRemainingTime = () => {
    return -1 * moment().diff(this.props.targetDate)
  }

  addLeadingZero = (value) => {
    if (value < 10) {
      return '0' + value.toString()
    }
    return value
  }

  tick = () => {
    this.setState({
      remainingTime: this.calculateRemainingTime()
    })

    if (this.state.remainingTime <= 0) {
      this.setState({
        status: COUNTDOWN_FINISHED
      })

      if (this.props.onFinished) {
        this.props.onFinished()
      }
      clearInterval(this.state.intervalId)
    }
  }

  renderRemainingTime = () => {
    const html = []
    const { format, leadingZero } = this.props
    const { remainingTime } = this.state
    const r = moment.duration(remainingTime)

    const withField = (name, countFloating = null) => {
      if (format[name]) {
        const textualName = name.charAt(0).toUpperCase() + name.slice(1);
        const x = r.as(name);
        //const x = r.get(name)
        const x2 = maxFloat(numberWithCommas(leadingZero ? this.addLeadingZero(x) : x), countFloating)

        html.push(
          <div className={`item react-cntdwn-${name} col-12`} key={name}>
            <h3>{textualName}</h3>
            <h2>{x2}</h2>
          </div>
        )
      }
    }

    // withField('years')
    // withField('months')
    // withField('days')
    withField('hours', 5)
    //withField('minutes')
    //withField('seconds')
    //withField('milliseconds')

    return (<div className="react-cntdwn row align-items-center">
      {html}
    </div>)
  }

  render = () => {
    if (this.state.status === COUNTDOWN_NOT_STARTED) {
      return (
        <span></span>
      )
    }
    return (
      <div className='react-cntdwn-timer'>
        {this.renderRemainingTime()}
      </div>
    )
  }
}

Countdown.propTypes = {
  targetDate: PropTypes.instanceOf(Date).isRequired,
  interval: PropTypes.number,
  startDelay: PropTypes.number,
  onFinished: PropTypes.func,
  format: PropTypes.object,
  leadingZero: PropTypes.bool
}

Countdown.defaultProps = {
  interval: 1000,
  startDelay: 0,
  format: {
    years: true,
    months: true,
    days: true,
    hours: 'HH',
    minutes: 'MM',
    seconds: 'SS',
//    milliseconds: true,
  },
  leadingZero: false
}