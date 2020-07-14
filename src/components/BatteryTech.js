import React from 'react'
import { connect } from 'react-redux'
import {
  PieChart, Pie, Cell,
} from 'recharts';
import colors from '../mixins/colors'

function mergeByCount(batts) {
  const output =  batts.reduce((arr, batt) => {

    const index = arr.findIndex(itm => itm.batt === batt)

    if(index === -1) return [
      ...arr,
      {
        batt,
        count: 1
      }
    ]

    arr[index].count++

    return arr
  
  }, [])

  return output.sort((a,b) => a.count - b.count)
}

function mergeBattTechItems(dat) {
  return dat.reduce((arr, item) => (
    item.m_szBatteryTech.length > 0 ?
    [
      ...arr,
      ...item.m_szBatteryTech
    ]
    :
    arr
  ), [])
}

const BatteryTech = ({
  data,
  currentSelection
}) => { 

  let batts = []

  if(data) batts = mergeByCount(mergeBattTechItems(data[currentSelection]))

  return (
    <>
      <h2>Key Innovations</h2>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          startAngle={180}
          endAngle={0}
          data={batts}
          cg={200}
          cy={200}
          innerRadius={100}
          outerRadius={150}
          fill="#8884d8"
          label={({batt}) => batt}
        />
        {
          batts.map((batt, i) => (
            <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />
          ))
        }
      </PieChart>
    </>
  )

}

export default connect(
  state => ({
    data: state.data,
    currentSelection: state.currentSelection
  })
)(BatteryTech)
