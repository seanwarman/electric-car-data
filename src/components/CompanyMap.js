import React from 'react'
import { connect } from 'react-redux'
import Chart from './Chart'
import RecentSummaries from './RecentSummaries'
import BatteryTech from './BatteryTech'
import {
  Col,
  Row,
  Card
} from 'antd'

const topLeft = {
  height: 391.5,
  marginBottom: 16,
}

const bottomLeft = {
  height: 497
}

const leftLeft = {
  height: 905.5
}

function CompanyMap({
  data
}) {

  const loading = data === undefined


  return (
    <Row gutter={16}>
      <Col span={12}>

        <Row>

          <Col span={24}>

            <Card style={topLeft} loading={loading}>
              <Chart />
            </Card>

          </Col>

          <Col span={24}>

            <Card style={bottomLeft} loading={loading}>
              <BatteryTech />
            </Card>

          </Col>

        </Row>

      </Col>
      <Col span={12}>

        <Card style={leftLeft} loading={loading}>
          <RecentSummaries />
        </Card>

      </Col>
    </Row>
  )
}

export default connect(
  state => ({
    data: state.data
  })
)(CompanyMap)
