import React from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import './App.css';

function App({
  getData
}) {

  return (
    <div className="App">

      <button
        onClick={() => {
          getData()
        }}
      >Get Data</button>

    </div>
  )
}

function mapStateToProps(state) {
  return state
}

export default connect(
  mapStateToProps,
  actions
)(App)
