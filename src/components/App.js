import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import CompanySelect from './CompanySelect'
import CompanyMap from './CompanyMap'
import {
  Layout,
  Breadcrumb,
  Radio,
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
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Radio.Group 
              value={currentSelection}
              buttonStyle="solid"
            >
              {
                selections.map((selection, i) => (
                  <Radio.Button
                    value={selection}
                    onClick={() => setCurrentSelection(selection)}
                  >
                    {selection}
                  </Radio.Button>
                ))
              }
            </Radio.Group>
          </Breadcrumb>

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
