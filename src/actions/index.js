import api from '../lib/api'
import {
  REQ_DATA,
  REQ_FAILED,
  RECIEVE_DATA,
} from '../constants'

export function getData() {
  return async function(dispatch) {

    dispatch(reqData(REQ_DATA))

    let result

    try {
      result = await api.get('/data')
    } catch (error) {
      console.log('There was an error requesting the data', error)
      return dispatch(reqFailed(error))
    }

    return dispatch(receiveData(result.data))


  }

}

export const reqData = () => ({ type: REQ_DATA })
export const reqFailed = (error) => ({ type: REQ_FAILED, error })
export const receiveData = (data) => ({ type: RECIEVE_DATA, data })

