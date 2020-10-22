import React from 'react'
import {
  Row, Col, Checkbox, Input,
} from 'antd'

import { useRecoilState } from 'recoil'

import { OptionalToggle, CustomAlias } from '../states/atom'

const Optional = () => {
  const [OptionalToggleData, setOptionalToggleData] = useRecoilState(
    OptionalToggle,
  )

  const updateOptionalToggleData = () => {
    setOptionalToggleData(!OptionalToggleData)
  }

  const [CustomAliasData, setCustomAliasData] = useRecoilState(
    CustomAlias,
  )

  const updateCustomAliasData = (e) => {
    setCustomAliasData(e.target.value)
  }

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 16, offset: 4 }}
        xl={{ span: 14, offset: 5 }}
        xxl={{ span: 12, offset: 6 }}
        style={{ marginTop: '0.3rem' }}
      >
        <Row>
          <Col span={24}>
            <Checkbox
              onChange={() => {
                updateOptionalToggleData()
              }}
              checked={OptionalToggleData}
            >
              Custom alias (optional)
            </Checkbox>
          </Col>
          {OptionalToggleData && (
            <Col span={24} style={{ marginTop: '0.3rem' }}>
              <Input
                addonBefore="http://r.chnwt.dev/"
                size="large"
                placeholder="custom"
                value={CustomAliasData}
                onChange={updateCustomAliasData}
              />
            </Col>
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Optional
