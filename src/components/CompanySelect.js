import React from 'react'
import { connect } from 'react-redux'
import {
  Select
} from 'antd'

const companies = [
  'Acura', 'Alfa Romeo', 'Audi', 'BMW', 'Bentley', 'Bugatti', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Citroen', 'DS Automobiles',
  'Dacia', 'Daihatsu', 'Daimler', 'FCA', 'Ferrari', 'Fiat', 'Ford', 'GMC', 'Geely', 'General Motors', 'Genesis', 'Holden',
  'Honda', 'Hyundai', 'Infiniti', 'Jaguar', 'Jeep', 'Kia', 'Lamborghini', 'Lotus', 'Lancia', 'Land Rover', 'Lexus', 'Lincoln Motor Company', 
  'London Taxi Company', 'MINI', 'Maserati', 'Mercedes-Benz', 'Nissan', 'Opel', 'PSA', 'Peugeot', 'Porsche', 'RAM', 'Renault', 'Rolls-Royce', 
  'SMART', 'Samsung', 'Seat', 'Skoda', 'Tesla', 'TATA Motors', 'Toyota', 'Vauxhall', 'Volkswagen', 'Volvo', 'Wuling Motors'
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
