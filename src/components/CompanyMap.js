import React from 'react'
import { connect } from 'react-redux'
import Chart from './Chart'
import RecentSummaries from './RecentSummaries'

function CompanyMap() {

  return (
    <div>
      <Chart />
      <RecentSummaries />
    </div>
  )
}

export default connect(
  state => ({
    data: state.data
  })
)(CompanyMap)
