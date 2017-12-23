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
        dispatch({ type: STORAGE_INIT, r })
      }
    )

    chrome.storage.sync.get({
        'clicked': false
      },
      (payload) => dispatch({ type: STORAGE_INIT, payload })
    )
  }
}

export const justClick = () => {
  return (dispatch) => {
    chrome.storage.sync.set({
      'clicked': true
    })
  }
}

