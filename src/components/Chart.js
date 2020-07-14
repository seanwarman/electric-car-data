import React from 'react'
import { connect } from 'react-redux'
import colors from '../mixins/colors'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip
} from 'recharts'

function convertData(data) {

  if(!data) return []

  let year = 1990
  let output = []

  do {

    let y = year

    const dataByYear = data.filter(item => Number(item.m_szYear) === y)

    output.push({
      data: dataByYear,
      year,
      count: dataByYear.length || 0
    })

    year++

  } while (year < 2021)

  return output
}

function Chart({
  data,
  selections
}) {

  return (
      <LineChart width={500} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" allowDuplicatedCategory={false} />
        <YAxis dataKey="count" />
        <Tooltip />
        <Legend />
        {
          selections.map((selection, i) => (

            <Line 
              key={i} 
              dataKey="count" 
              data={convertData(data[selection])} 
              type="monotone"
              name={selection}
              stroke={colors[i]}
            ></Line>
  
          ))
        }
      </LineChart>
  )
}

function mapStateToProps(state) {
  return {
    data: state.data,
    selections: state.selections
  }
}

export default connect(
  mapStateToProps
)(Chart)

