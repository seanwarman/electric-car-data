import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import './App.css';

function onTerm(term) {
  
}

function App({
  getData
}) {

  const [ term, setTerm ] = useState('')

  return (
    <div className="App">

      <button
        onClick={() => {
          getData(term)
        }}
      >Get Data</button>

    <input
      onChange={e => setTerm(e.target.value)}
    >
    </input>

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
