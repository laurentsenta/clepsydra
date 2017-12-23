import { combineReducers } from 'redux'
import { JUST_CLICK } from "./actions"

const initialState = {
  clicked: false
}

function clickApp(state = initialState, action) {
  switch (action.type) {
    case JUST_CLICK:
      return { ...state, clicked: true }
    default:
      return state
  }
}

export default combineReducers(
  {
    click: clickApp
  }
)
