import React from 'react'
import { Row, Col } from 'antd'
import { RecoilRoot } from 'recoil'

import './App.css'

import Logo from '../components/Logo'
import LinkInput from '../components/LinkInput'
import ShortenLink from '../components/ShortenLink'
import Optional from '../components/Optional'

const styles = {
  container: {
    padding: '2em',
    height: '100vh',
  },
}

const App = () => (
  <RecoilRoot>
    <div style={styles.container}>
      <Row>
        <Col span={24}>
          <Logo />
          <LinkInput />
          <Optional />
          <ShortenLink />
        </Col>
      </Row>
    </div>
  </RecoilRoot>
)

export default App
