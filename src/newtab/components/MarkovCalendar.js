import './MarkovCalendar.css';
import React, { Component } from 'react';

// bleep
const b = (hours, minutes, name) => ({ hours, minutes, name })

const HEALTHY = "healthy"
const WEALTHY = "wealthy"
const WISE = "wise"
const PLAN = "plan"

const SLEEP = { name: "SLEEP", kind: HEALTHY }
const RUN = { name: "RUN", kind: HEALTHY }
const BREAKFAST = { name: "BREAKFAST", kind: HEALTHY }
const MEDITATE = { name: "M!", kind: WISE }
const PRODUCT = { name: "PRODUCT", kind: WEALTHY }
const ELIMINATE = { name: "ELIMINATE", kind: PLAN }
const LUNCH = { name: "LUNCH", kind: HEALTHY }
const SOCIAL = { name: "S!", kind: HEALTHY }
const DINNER = { name: "DINNER", kind: HEALTHY }
const RECAP = { name: "RECAP", kind: PLAN }
const WRITE = { name: "WRITE", kind: WISE }
const READ = { name: "READ", kind: WISE }
const LEARN = { name: "LEARN", kind: WISE }
const EXPLORE = { name: "EXPLORE", kind: WISE }
const AUTOMATE = { name: "AUTOMATE", kind: PLAN }
const EXERCISE = { name: "EXERCISE", kind: HEALTHY }
const STORY = { name: "STORY", kind: WISE }
const BUSINESS = { name: "BUSINESS", kind: WEALTHY }
const MARKETING = { name: "MARKETING", kind: WEALTHY }
const CULTURE = { name: "CULTURE", kind: WEALTHY }
const DELEGATE = { name: "DELEGATE", kind: PLAN }
const DRAWING = { name: "Dr!", kind: WISE }

const TIMES = [
  // sunday
  [b(0, 0, SLEEP), b(7, 0, RUN), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, STORY), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, EXPLORE), b(17, 0, MEDITATE), b(17, 30, LEARN),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  // monday
  [b(0, 0, SLEEP), b(7, 0, RUN), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, PRODUCT), b(11, 30, ELIMINATE), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, PRODUCT), b(17, 0, MEDITATE), b(17, 30, SOCIAL),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  // tuesday
  [b(0, 0, SLEEP), b(7, 0, EXERCISE), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, PRODUCT), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, PRODUCT), b(17, 0, MEDITATE), b(17, 30, LEARN),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  //
  [b(0, 0, SLEEP), b(7, 0, RUN), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, PRODUCT), b(11, 30, AUTOMATE), b(12, 0, LUNCH),
    b(13, 30, BUSINESS), b(14, 0, MEDITATE),
    b(14, 30, PRODUCT), b(17, 0, MEDITATE), b(17, 30, EXPLORE),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  //
  [b(0, 0, SLEEP), b(7, 0, EXERCISE), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, BUSINESS), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, MARKETING), b(15, 30, CULTURE), b(17, 0, MEDITATE), b(17, 30, LEARN),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  // Friday
  [b(0, 0, SLEEP), b(7, 0, RUN), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, WRITE), b(11, 30, DELEGATE), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, STORY), b(17, 0, MEDITATE), b(17, 30, SOCIAL),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
  //
  [b(0, 0, SLEEP), b(7, 0, RUN), b(8, 0, BREAKFAST), b(8, 30, MEDITATE),
    b(9, 0, PRODUCT), b(12, 0, LUNCH),
    b(13, 30, SOCIAL), b(14, 0, MEDITATE),
    b(14, 30, DRAWING), b(17, 0, MEDITATE), b(17, 30, SOCIAL),
    b(19, 0, DINNER), b(20, 0, RECAP), b(20, 30, WRITE), b(21, 0, READ), b(22, 0, SLEEP)],
]

function getCurrent() {
  const now = new Date();

  const day = TIMES[now.getDay()];

  for (let i = 1; i < day.length; i++) {
    const { hours, minutes } = day[i];
    if (hours > now.getHours()) {
      return { day: now.getDay(), tick: i - 1 };
    }
    if (hours === now.getHours() && minutes > now.getMinutes()) {
      return { day: now.getDay(), tick: i - 1 };
    }
  }
  return { day: now.getDay(), tick: day.length - 1 };
}

function grabN(n) {
  const { day, tick } = getCurrent()

  const D = TIMES[day];

  return D.map((x, i) => ({ dist: i - tick, ...x }))
    .filter(({ dist }) => Math.abs(dist) <= n);
}

class MarkovItem extends Component {
  render() {
    const { hours, minutes, content, weight } = this.props
    const absWeight = Math.abs(weight);

    return (
      <tr className={`${content.kind} item-dist-${absWeight}`}>
        <th>{hours}:{minutes.toString().padStart(2, '0')}</th>
        <th>{content.name}</th>
      </tr>
    )
  }
}

class MarkovCalendar extends Component {
  static propTypes = {}


  render() {
    const m = grabN(2)
    return (
      <div className="calendar">
        <h2>Markov</h2>
        <table className="table">
          <tbody>
          {m.map((x, i) => <MarkovItem key={i} weight={x.dist} content={x.name} hours={x.hours} minutes={x.minutes}/>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MarkovCalendar
