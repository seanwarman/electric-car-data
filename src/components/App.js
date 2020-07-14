import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import CompanySelect from './CompanySelect'
import CompanyMap from './CompanyMap'
import SelectCars from './SelectCars'
import {
  Layout,
} from 'antd'

const {
  Header,
  Footer,
  Content
} = Layout

function App({
  getData,
  getByFilters,
  selections,
  currentSelection,
  setCurrentSelection
}) {

  useEffect(() => {

    getData(currentSelection)
  
  }, [getData])

  return (
    <div className="App">

      <Layout style={{ height: '100vh' }}>
        <Header style={{ postion: 'fixed', zIndex: 1, width: '100%' }}>

          <CompanySelect
            disableSelections={selections}
            onChange={selection => getData(selection)}
          >
          </CompanySelect>

        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

          <SelectCars>
          </SelectCars>

          <CompanyMap>
          </CompanyMap>

        </Content>
        <Footer style={{ textAlign: 'center' }}>Created by Sean Warman</Footer>
      </Layout>

    </div>
  )
}

function mapStateToProps(state) {
  return {
    selections: state.selections,
    currentSelection: state.currentSelection
  }
}

export default connect(
  mapStateToProps,
  actions
)(App)
