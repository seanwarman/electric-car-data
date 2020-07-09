import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import { Provider } from 'react-redux'
import App from './App'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

const store = createStore(
  state => state,
  compose(
    applyMiddleware(thunkMiddleware)
  )
)


const setup = (props = {}) => {
  const renderer = createRenderer()
  renderer.render(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  )
  const output = renderer.getRenderOutput()
  return output
}

describe('App', () => {

  it('should render', () => {

    const output = setup({ store: {} })
    expect(output.props.children.type).toBe(App)


  })

})
