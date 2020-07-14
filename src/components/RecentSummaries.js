import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  List,
  Avatar,
} from 'antd'
import {
  AlignLeftOutlined
} from '@ant-design/icons'

const RecentSummaries = ({
  currentSelection,
  data,
  selections = []
}) => { 

  return <div>
    <h2>Articles</h2>

    {
      data &&
      <List
        itemLayout="horizontal"
        dataSource={data[currentSelection]}
        pagination={{
          pageSize: 8
        }}
        renderItem={dataItem => {

          return  (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={<AlignLeftOutlined />} />}
                title={<Button
                  target="_blank"
                  type="link"
                  href={dataItem.m_szSrcUrl}
                >
                  {
                    dataItem.m_szDocTitle.length > 70 ?
                    dataItem.m_szDocTitle.slice(0, 70) + '...'
                      :
                      dataItem.m_szDocTitle
                  }
                </Button>}
                  description={dataItem.m_Companies.slice(0, 5).join(', ')}
                />
              </List.Item>
          )

        }}
      >
      </List>
    }

  </div>

}

export default connect(
  state => ({
    currentSelection: state.currentSelection,
    selections: state.selections,
    data: state.data
  })
)(RecentSummaries)
