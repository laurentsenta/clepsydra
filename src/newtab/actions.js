/* global chrome */

export const JUST_CLICK = 'JUST_CLICK'
export const STORAGE_INIT = 'STORAGE_INIT'

export const storageInit = () => {
  return (dispatch) => {

    chrome.storage.onChanged.addListener(
      (change, region) => {
        if (region !== 'sync') {
          console.log('IGNORED CHANGE FOR REGION=', region, 'CHANGE=', change)
          return
        }

        const r = {}
        Object.entries(change)
          .forEach(([k, v]) => {
            if (v.newValue) {
              r[k] = v.newValue
            }
          })

        // TODO: update not init
        dispatch({ type: STORAGE_INIT, payload: r })
      }
    )

    chrome.storage.sync.get({
        'user.birthDate': '08-08-1980',
        'user.lifeExpectancy': 71,
        'introductionCompleted': false,
        'birthDateWasSet': false,
        'lifeExpectancyWasSet': false,
      },
      (payload) => dispatch({ type: STORAGE_INIT, payload })
    )
  }
}

export const storageUpdate = (values) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(values,
        resolve())
    })
  }
}

export const justClick = () => {
  return storageUpdate({ clicked: true })
}

export const completeIntroduction = () => {
  return storageUpdate({ introductionCompleted: true })
}

