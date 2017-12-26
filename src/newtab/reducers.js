import set from 'lodash.set'
import cloneDeep from 'lodash.clonedeep'

import { JUST_CLICK, STORAGE_INIT } from "./actions"

export const STATE_VOID = 'VOID'
export const STATE_LOADING = 'LOADING'
export const STATE_READY = 'READY'

const initialState = {
  introductionCompleted: false,
  birthDateWasSet: false,
  lifeExpectancyWasSet: false,
  storageState: STATE_VOID,
  user: { lifeExpectancy: undefined, birthDate: undefined }
}

function updateWithStoragePayload(state, payload) {
  state = cloneDeep(state)

  Object.entries(payload).forEach(([k, v]) => {
    set(state, k, v)
  })

  return state
}

export default (state = initialState, action) => {
  switch (action.type) {
    case JUST_CLICK:
      return { ...cloneDeep(state), clicked: true }
    case STORAGE_INIT:
      return updateWithStoragePayload(
        { ...state, storageState: STATE_READY },
        action.payload
      )
    default:
      return state
  }
}
