import React from 'react'
import { connect } from 'react-redux'
import {
  Select
} from 'antd'

const companies = [
  'Audi', 'BMW', 'Bentley', 'Buick', 'Cadillac', 'Chrysler', 'Citroen',
  'Dacia', 'Ferrari', 'Ford', 'Geely', 'General Motors', 'Holden',
  'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Lamborghini', 'Lotus', 'Land Rover',
  'Maserati', 'Mercedes-Benz', 'Nissan', 'Opel', 'PSA', 'Peugeot', 'Porsche', 'Renault', 'Rolls-Royce', 
  'Samsung', 'Seat', 'Tesla', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo'
]


function CompanySelect({
  onChange,
  disableSelections,
  isPending
}) {

  return (

    <Select
      disabled={isPending}
      loading={isPending}
      placeholder="Please select a company"
      style={{ width: '200px' }}
      onChange={onChange}
    >
      {
        companies.map((company, i) => (

          <Select.Option 
            key={i}
            disabled={disableSelections.includes(company)}
            value={company}
          >
            {company}
          </Select.Option>

        ))
      }
    </Select>

  )
}

export default connect(
  state => ({
    isPending: state.isPending
  })
)(CompanySelect)
