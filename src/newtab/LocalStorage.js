import React, { Component } from 'react';
import { connect } from 'react-redux'
import { STATE_READY } from "./reducers"
import { storageInit } from "./actions"
import store from './store'

class LocalStorageLoaderRaw extends Component {
  constructor() {
    super()
    store.dispatch(storageInit())
  }

  render() {
    if (this.props.storageState === STATE_READY) {
      return this.props.children
    }
    else {
      return null
    }
  }
}

const mapStateToProps = (state) => {
  return {
    storageState: state.storageState
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const LocalStorageLoader = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocalStorageLoaderRaw)

export default LocalStorageLoader

