import React from 'react'
import { connect } from 'react-redux'
import {
  Card,
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
    <h2>{currentSelection}</h2>

    <Card>
      {
        data &&
        <List
          itemLayout="horizontal"
          dataSource={data[currentSelection]}
          pagination={{
            pageSize: 10
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
    </Card>


  </div>

}

export default connect(
  state => ({
    currentSelection: state.currentSelection,
    selections: state.selections,
    data: state.data
  })
)(RecentSummaries)
