import React from 'react';
import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'remote-redux-devtools';
import { createForms } from 'react-redux-form';

const initialUserState = {
  birthDate: '01/01/1980',
  lifeExpectancy: 71
};

function composeRoot(root, rest) {
  return (state, action) => {
    state = root(state, action)

    Object.entries(rest)
      .forEach(([k, v]) => {
        state[k] = v(state[k], action)
      })

    return state
  }
}

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8096 });

export default createStore(
  composeRoot(
    reducers,
    createForms({
      user: initialUserState,
    })
  ),
  composeEnhancers(applyMiddleware(thunk))
)

