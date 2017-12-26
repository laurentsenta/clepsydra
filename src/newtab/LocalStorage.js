import React, { Component } from 'react';
import { connect } from 'react-redux'
import { STATE_READY } from "./reducers"
import { storageInit } from "./actions"

class LocalStorageLoaderRaw extends Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    if (this.props.storageState === STATE_READY) {
      return this.props.children
    }
    else {
      return (
        <div>Loading</div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    storageState: state.storageState
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(storageInit())
    },
  }
}

const LocalStorageLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalStorageLoaderRaw)

export default LocalStorageLoader

