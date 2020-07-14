import {
  REQ_DATA,
  REQ_FAILED,
  RECIEVE_DATA,
  PUSH_DATA,
  SET_CURRENT_SELECTION
} from '../constants'

import initialState from '../initialState'

export function reducer(state = initialState, action) {
  switch(action.type) {
    case REQ_DATA:
      return {
        ...state,
        isPending: true,
        error: undefined
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
    case PUSH_DATA:
      return {
        ...state,
        isPending: false,
        data: {
          ...state.data,
          [action.selection]: action.data.sort((a,b) => 
            Number(a.m_zsYear) - Number(b.m_zsYear)
          )
        },
        selections: [
          ...state.selections,
          action.selection
        ],
        currentSelection: action.selection
      }
    case SET_CURRENT_SELECTION:
      return {
        ...state,
        currentSelection: action.selection
      }
    default:
      return state
  }
}
