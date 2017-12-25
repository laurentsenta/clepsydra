import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import merge from 'lodash.merge'
import { connect } from 'react-redux'
import { completeIntroduction, justClick, storageInit, storageUpdate } from './actions'
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
  componentDidMount() {
    this.props.init()
  }

  render() {
    console.log('RENDER=', this.props.user)

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>

        <Clicked onClick={this.props.onClick} clicked={this.props.clicked}/>

        <BirthDateForm submit={(x) => this.props.updateUser('birthDate', x)}
                       value={this.props.user.birthDate}/>
        <LifeExpectancyForm submit={(x) => this.props.updateUser('lifeExpectancy', x)}
                            value={this.props.user.lifeExpectancy}/>

        <p className="App-intro">
          This is the New Tab Page
        </p>

        <Introduction completed={this.props.introductionCompleted}
                      complete={this.props.completeIntroduction}/>

        <Countdown birthDate={this.props.user.birthDate}
                   lifeExpectancy={this.props.user.lifeExpectancy}/>

        <WeeklyCalendar birthDate={this.props.user.birthDate}
                        lifeExpectancy={this.props.user.lifeExpectancy}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('MAPPING=', state)
  return {
    clicked: state.clicked,
    introductionCompleted: state.introductionCompleted,
    user: merge({}, initialUserState, state.user)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(storageInit())
    },
    onClick: () => {
      dispatch(justClick())
    },
    updateUser: (key, value) => {
      const k = 'user.' + key
      dispatch(storageUpdate({ [k]: value }))
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

export default App;
