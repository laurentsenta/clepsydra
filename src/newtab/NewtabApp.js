import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './NewtabApp.css';
import { connect } from 'react-redux'
import { justClick } from './actions'

const Clicked = ({ onClick, clicked }) => (
  <h2 onClick={onClick}>Clicked: {clicked ? "Yes" : "No"}</h2>
)

Clicked.propTypes = {
  onClick: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired
}


class NewtabAppRaw extends Component {
  render() {
    return (
      <div className="NewtabApp">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
          This is the New Tab Page

          <Clicked onClick={this.props.onClick} clicked={this.props.clicked}/>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    clicked: state.click.clicked
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(justClick())
    }
  }
}

const NewtabApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewtabAppRaw)

export default NewtabApp;
