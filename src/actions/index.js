import api from '../lib/api'
import {
  REQ_DATA,
  REQ_FAILED,
  RECIEVE_DATA,
  PUSH_DATA,
  SET_CURRENT_SELECTION,
  REMOVE_SELECTION
} from '../constants'

export function getByFilters(filters) {

  if(!filters) return

  return async function(dispatch) {

    return processRequest(dispatch, () => {
      return api.put('/data', filters)
    })

  }

}

export function getData(selection) {

  if(!selection) return

  return async function(dispatch) {

    const data = await processRequest(dispatch, () => {
      return api.get('/data/' + selection)
    })

    return dispatch(pushDataToState(selection, data))
    
  }

}

async function processRequest(dispatch, method) {

    dispatch(reqData(REQ_DATA))

    let result

    try {
      result = await method()
    } catch (error) {
      console.log('There was an error requesting the data', error)
      return dispatch(reqFailed(error))
    }

    return result.data
  
}

export const reqData = () => ({ type: REQ_DATA })
export const reqFailed = (error) => ({ type: REQ_FAILED, error })
export const receiveData = (data) => ({ type: RECIEVE_DATA, data })
export const pushDataToState = (selection, data) => ({type: PUSH_DATA, selection, data})
export const setCurrentSelection = selection => ({type: SET_CURRENT_SELECTION, selection})
export const removeSelection = selection => ({type: REMOVE_SELECTION, selection})
