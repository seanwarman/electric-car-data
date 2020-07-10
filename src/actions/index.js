import api from '../lib/api'
import {
  REQ_DATA,
  REQ_FAILED,
  RECIEVE_DATA,
} from '../constants'

export function getByFilters(filters) {

  if(!filters) return

  return async function(dispatch) {

    return processRequest(dispatch, () => {
      return api.put('/data', filters)
    })

  }

}

export function getData(params) {

  if(!params) return

  const [ key ] = Object.keys(params)
  const value = params[key]

  return async function(dispatch) {

    return processRequest(dispatch, () => {
      return api.get('/data/' + key + '/' + value)
    })

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

    return dispatch(receiveData(result.data))



  
}

export const reqData = () => ({ type: REQ_DATA })
export const reqFailed = (error) => ({ type: REQ_FAILED, error })
export const receiveData = (data) => ({ type: RECIEVE_DATA, data })

