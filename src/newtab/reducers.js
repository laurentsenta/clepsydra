import { JUST_CLICK, STORAGE_INIT } from "./actions"

const STATE_VOID = 'VOID'
const STATE_LOADING = 'LOADING'
const STATE_READY = 'READY'

const initialState = {
  clicked: false,
  storageState: STATE_VOID
}

export default (state = initialState, action) => {
  switch (action.type) {
    case JUST_CLICK:
      return { ...state, clicked: true }
    case STORAGE_INIT:
      return { ...state, ...action.payload, storageState: STATE_READY }
    default:
      return state
  }
}
