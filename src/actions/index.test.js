import * as actions from '.'
import * as constants from '../constants'

function itter(description, expecter, expected) {
  return it(description , () => {
    expect(expecter).toEqual(expected)
  })
}

describe('actions', () => {

  itter('reqData should create REQ_DATA action', actions.reqData(), {
    type: constants.REQ_DATA,
  })

  itter('reqFailed should create REQ_FAILED action', actions.reqFailed(new Error()), {
    error: new Error(),
    type: constants.REQ_FAILED
  })

  itter('receiveData should create a RECIEVE_DATA action', actions.receiveData({}), {
    data: {},
    type: constants.RECIEVE_DATA
  })

})
