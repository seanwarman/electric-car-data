import React, { useState } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions'
import './App.css';

function search({
  year,
  summary
}) {

  let params = {}

  if(year?.length > 0)    params.m_szYear     = year
  if(summary?.length > 0) params.m_szDocTitle = summary

  if(Object.keys(params).length === 0) return

  return params

}

function App({
  getData,
  getByFilters
}) {

  const [ year, setYear ] = useState('')
  const [ summary, setSummary ] = useState('')

  return (
    <div className="App">

      year:
      <input
        label="Year"
        onChange={e => setYear(e.target.value)}
      >
      </input>

      summary:
      <input
        label="Summary Search"
        onChange={e => setSummary(e.target.value)}
      >
      </input>

      <button
        onClick={() => {
          getData(search({
            summary
          }))
          // getByFilters(search({
          //   year, 
          //   summary
          // }))
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
