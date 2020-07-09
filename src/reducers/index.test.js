import { reducer, initialState } from './index'
import * as constants from '../constants'

const itter = (description, {state = undefined, action = {}}, output) => {
  it(description , () => {
    expect(reducer(state, action)).toEqual(output)
  })
}

describe('reducer', () => {

  itter('should handle initial state', {
    state: undefined,
    action: {}
  }, initialState)

  itter('should handle REQ_DATA', {
    state: {},
    action: { type: constants.REQ_DATA }
  }, {
    isPending: true
  })

  itter('should handle REQ_FAILED', {
    state: {},
    action: {
      type: constants.REQ_FAILED,
      error: new Response(null, {
        status: 404,
      })
    }
  }, {
    error: new Response(null, {
        status: 404,
      }),
    status: 404,
    isPending: false
  })

  itter('should handle RECIEVE_DATA', {
    state: {},
    action: {
      type: constants.RECIEVE_DATA,
      data: {}
    }
  }, {
    data: {},
    status: 200,
    isPending: false
  })
})
