import {
  REQ_DATA,
  REQ_FAILED,
  RECIEVE_DATA
} from '../constants'

export const initialState = {

  isPending: false,
  error: undefined,
  message: undefined,
  status: undefined,
  data: undefined,

}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case REQ_DATA:
      return {
        ...state,
        isPending: true
      }
    case REQ_FAILED:
      return {
        ...state,
        error: action.error,
        status: action.error.status,
        isPending: false
      }
    case RECIEVE_DATA:
      return {
        ...state,
        data: action.data,
        status: 200,
        isPending: false
      }
    default:
      return state
  }
}
