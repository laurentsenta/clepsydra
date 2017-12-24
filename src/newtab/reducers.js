import set from 'lodash.set'
import { JUST_CLICK, STORAGE_INIT } from "./actions"

const STATE_VOID = 'VOID'
const STATE_LOADING = 'LOADING'
const STATE_READY = 'READY'

const initialState = {
  clicked: false,
  storageState: STATE_VOID,
  user: { lifeExpectancy: undefined, birthDate: undefined }
}

function updateWithStoragePayload(state, payload) {
  state = { ...state } // TODO: not deep => leaky

  Object.entries(payload).forEach(([k, v]) => {
    set(state, k, v)
  })

  return state
}

export default (state = initialState, action) => {
  switch (action.type) {
    case JUST_CLICK:
      return { ...state, clicked: true }
    case STORAGE_INIT:
      return updateWithStoragePayload(
        { ...state, storageState: STATE_READY },
        action.payload
      )
    default:
      return state
  }
}
