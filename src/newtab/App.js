import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { connect } from 'react-redux'
import { justClick, storageInit } from './actions'
import UserForm from "./UserForm"

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
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <Clicked onClick={this.props.onClick} clicked={this.props.clicked}/>
        <UserForm/>
        <p className="App-intro">
          This is the New Tab Page
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clicked: state.clicked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(storageInit())
    },
    onClick: () => {
      dispatch(justClick())
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRaw)

export default App;
