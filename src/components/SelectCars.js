import React from 'react'
import { connect } from 'react-redux'
import {
  setCurrentSelection,
  removeSelection
} from '../actions'
import {
  Badge,
  Radio,
} from 'antd'
import './SelectCars.css'

function onBadge(e, {
  removeSelection,
  selection
}) {
  e.stopPropagation()
  removeSelection(selection)
}

const SelectCars = ({
  removeSelection,
  setCurrentSelection,
  currentSelection,
  selections
}) => (


<Radio.Group 
  id="select-cars"
  value={currentSelection}
  buttonStyle="solid"
  style={{display: 'flex', marginTop: 6}}
>
  {
    selections.map((selection, i) => (

      <div key={i}>
        
        <Radio.Button
          value={selection}
          onClick={() => setCurrentSelection(selection)}
        >
          {selection}
        </Radio.Button>

        {
          i > 0 &&
          <Badge 
            className="badge"
            count={'X'}
            onClick={e => onBadge(e, {
              removeSelection,
              selection
            })}
            title={'close ' + selection}
          ></Badge>
        }

      </div>

    ))
  }
</Radio.Group>


)

export default connect(
  state => ({
    currentSelection: state.currentSelection,
    selections: state.selections
  }),
  {
    setCurrentSelection,
    removeSelection
  }
)(SelectCars)
