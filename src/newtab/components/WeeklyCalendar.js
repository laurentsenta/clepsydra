import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'
import range from 'lodash.range'

const DOT_SIZE = 5
const DOT_MARGIN = 2
const DOT_TOTAL = DOT_SIZE + DOT_MARGIN

class SVGYear extends Component {
  render() {
    return (
      <g transform={`translate(${this.props.dX}, ${this.props.dY})`}>
        {range(52).map(x => {
          const size = this.props.size(this.props.i, x + 1, DOT_SIZE, DOT_MARGIN, DOT_TOTAL)

          if (size === 0) {
            return null
          }

          return (<rect className="week"
                        key={x}
                        width={size}
                        height={size}
                        x={x * DOT_TOTAL} y="0"
                        fill={this.props.color(this.props.i, x + 1)}>
            </rect>
          )
        })}
      </g>
    )
  }
}

class SVGCalendar extends Component {
  render() {
    const totalWeeks = this.props.maxWeek
    const totalYears = Math.ceil(totalWeeks / 52)

    return (
      <svg width={52 * DOT_TOTAL + 20} height={totalYears * DOT_TOTAL} transform="scale(1, -1)">
        {range(totalYears).map(x =>
          <SVGYear key={x}
                   color={this.props.color}
                   size={this.props.size}
                   i={x}
                   dX={10} dY={x * DOT_TOTAL}/>
        )}
      </svg>
    )
  }
}

const WeekNumber = ({ spent, remaining }) => (
  <div className="overlay-number">
    <span className="a">Week</span>
    <span className="b">{parseInt(spent)}&nbsp;/&nbsp;{parseInt(spent + remaining)}</span>
  </div>
)


class WeeklyCalendar extends Component {
  static propTypes = {
    birthDate: PropTypes.string,
    lifeExpectancy: PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = { hovering: false }
  }

  render() {
    if (this.props.birthDate && this.props.lifeExpectancy) {

      const birth = moment(this.props.birthDate, 'YYYY-MM-DD')
      const now = moment()
      const target = moment(birth).add(this.props.lifeExpectancy, 'years')

      const firstWeek = birth.week()
      const spent = now.diff(birth, 'weeks', true)
      const remaining = target.diff(now, 'weeks', true)

      // 0 indexed year
      const [nowY, nowW, nowDoW] = [now.year() - birth.year(), now.week(), now.day()]

      const colorFct = (y, w) => {
        if (y === 0 && w < firstWeek) {
          return `rgba(255, 255, 255, 0)`
        }
        if (y < nowY || (y === nowY && w < nowW)) {
          return `rgba(75, 41, 107, 1)`
        }
        if (y === nowY && w === nowW) {
          return `rgba(75, 41, 107, ${(nowDoW / 7) * 0.9 + 0.1})`
        }
        if (y > nowY || (y === nowY && w > nowW)) {
          return `rgba(75, 41, 107, 0.1)`
        }
      }

      const sizeFct = (y, w, size, margin, total) => {
        if (y === 0 && w < firstWeek) {
          return 0
        }
        if (y < nowY || (y === nowY && w < nowW)) {
          return total
        }
        if (y === nowY && w === nowW) {
          return size
        }
        if (y > nowY || (y === nowY && w > nowW)) {
          return size
        }
      }

      return (
        <div className="hoverable"
             onMouseEnter={() => this.onEnter()}
             onMouseLeave={() => this.onLeave()}>
          {this.state.hovering ? <WeekNumber spent={spent} remaining={remaining}/> : null}
          <SVGCalendar maxWeek={firstWeek + spent + remaining} color={colorFct} size={sizeFct}/>
        </div>
      )
    }
    else {
      return (
        <h1>Calendar Not Ready</h1>
      )
    }
  }

  onEnter() {
    this.setState({ hovering: true })
  }

  onLeave() {
    this.setState({ hovering: false })
  }
}

export default WeeklyCalendar
