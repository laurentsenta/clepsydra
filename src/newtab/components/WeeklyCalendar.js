import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import range from 'lodash.range'

class SVGYear extends Component {
  render() {
    return (
      <g transform={`translate(${this.props.dX}, ${this.props.dY})`}>
        {range(52).map(x =>
          <rect className="week"
                key={x}
                width="6"
                height="6"
                x={x * 8} y="0"
                fill={this.props.color(this.props.i, x + 1)}>
          </rect>
        )}
      </g>
    )
  }
}

class SVGCalendar extends Component {
  render() {
    const totalWeeks = this.props.maxWeek
    const totalYears = Math.ceil(totalWeeks / 52)

    return (
      <svg width={52 * 8 + 20} height={totalYears * 8}>
        {range(totalYears).map(x =>
          <SVGYear key={x} color={this.props.color} i={x} dX={10} dY={x * 8}/>
        )}
      </svg>
    )
  }
}

class WeeklyCalendar extends Component {
  static propTypes = {
    birthDate: PropTypes.string,
    lifeExpectancy: PropTypes.number
  }

  render() {
    if (this.props.birthDate && this.props.lifeExpectancy) {

      const birth = moment(this.props.birthDate, 'YYYY-MM-DD')
      const now = moment()
      const target = moment(birth).add(this.props.lifeExpectancy, 'years')

      const firstWeek = birth.week()
      const spent = now.diff(birth, 'weeks', true)
      const remaining = target.diff(now, 'weeks', true)

      console.log('WEEK=', firstWeek, 'SPENT=', spent)

      // 0 indexed year
      const [nowY, nowW, nowDoW] = [now.year() - birth.year(), now.week(), now.day()]

      console.log(nowDoW)

      const colorFct = (y, w) => {
        if (y === 0 && w < firstWeek) {
          return `rgba(255, 255, 255, 1)`
        }
        if (y < nowY || (y === nowY && w < nowW)) {
          return `rgba(0, 0, 0, 1)`
        }
        if (y === nowY && w === nowW) {
          console.log('DoW', nowDoW)
          return `rgba(0, 0, 0, ${(nowDoW / 7) * 0.9 + 0.1})`
        }
        if (y > nowY || (y === nowY && w > nowW)) {
          return `rgba(0, 0, 0, 0.1)`
        }
      }

      return (
        <div>
          <SVGCalendar maxWeek={firstWeek + spent + remaining} color={colorFct}/>
        </div>
      )
    }
    else {
      return (
        <h1>Calendar Not Ready</h1>
      )
    }
  }
}

export default WeeklyCalendar
