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

const badgeStyle = {
  position: 'absolute',
  transform: 'translate(9px, -30px)',
  zIndex: 2
}

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
  value={currentSelection}
  buttonStyle="solid"
  style={{display: 'flex'}}
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
            style={badgeStyle}
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
