import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import merge from 'lodash.merge'
import { connect } from 'react-redux'
import { completeIntroduction, justClick, storageUpdate } from './actions'
import { initialUserState } from './store'
import { BirthDateForm, LifeExpectancyForm } from "./components/UserForms"
import WeeklyCalendar from './components/WeeklyCalendar'
import Introduction from './components/Introduction'
import Countdown from "./components/Countdown"

const Clicked = ({ onClick, clicked }) => (
  <h2 onClick={onClick}>Clicked: {clicked ? "Yes" : "No"}</h2>
)

Clicked.propTypes = {
  onClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired
}

class AppRaw extends Component {
  render() {
    if (!this.props.introductionCompleted) {
      return (
        <Introduction completed={this.props.introductionCompleted}
                      complete={this.props.completeIntroduction}/>
      )
    }
    if (!this.props.birthDateSet) {
      return (
        <BirthDateForm submit={(x) => this.props.updateUser('birthDate', x)}
                       value={this.props.user.birthDate}/>
      )
    }
    if (!this.props.lifeExpectancySet) {
      return (
        <LifeExpectancyForm submit={(x) => this.props.updateUser('lifeExpectancy', x)}
                            value={this.props.user.lifeExpectancy}/>
      )
    }

    return (
      <div className="row">
        <div className="col-6">
          <WeeklyCalendar birthDate={this.props.user.birthDate}
                          lifeExpectancy={this.props.user.lifeExpectancy}/>
        </div>
        <div className="col-6">
          <Countdown birthDate={this.props.user.birthDate}
                     lifeExpectancy={this.props.user.lifeExpectancy}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    introductionCompleted: state.introductionCompleted,
    lifeExpectancySet: state.lifeExpectancyWasSet || false,
    birthDateSet: state.birthDateWasSet || false,
    user: merge({}, initialUserState, state.user)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(justClick())
    },
    updateUser: (key, value) => {
      const k = 'user.' + key
      const k2 = key + 'WasSet'

      console.log("UPDATING KEY=", k, "VALUE=", value, "WITH K2=", k2)
      dispatch(storageUpdate({ [k]: value, [k2]: true }))
    },
    completeIntroduction: () => {
      dispatch(completeIntroduction())
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRaw)

export default App
