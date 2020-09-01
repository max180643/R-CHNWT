import React, { useState, useEffect } from 'react'
import {
  Row, Col, Input, Button, notification, Spin,
} from 'antd'

import { LinkOutlined, LoadingOutlined } from '@ant-design/icons'
import { useRecoilState } from 'recoil'

import { ShortenLink } from '../states/atom'

const styles = {
  clOrange: {
    color: '#ff571c',
  },
  clDarkGray: {
    color: '#172e41',
  },
  orangeButton: {
    background: '#ff571c',
    borderColor: '#ff571c',
  },
  orangeBlockButton: {
    background: '#ff571c',
    borderColor: '#ff571c',
    marginTop: '0.5rem',
  },
  orangeButtonHover: {
    background: '#ed5019',
    borderColor: '#ed5019',
  },
  orangeBlockButtonHover: {
    background: '#ed5019',
    borderColor: '#ed5019',
    marginTop: '0.5rem',
  },
}

const axios = require('axios')

const LinkInput = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()
  }, [])

  const [hover, setHover] = useState(false)

  const toggleHover = () => {
    setHover(!hover)
  }

  const [pathInput, setPathInput] = useState('')

  const updatePathInput = (e) => {
    setPathInput(e.target.value)
  }

  const [fetching, setFetching] = useState(false)

  const [ShortenLinkData, setShortenLinkData] = useRecoilState(ShortenLink)

  const updateShortenLinkData = (data) => {
    setShortenLinkData(() => [
      ...ShortenLinkData,
      ...data,
    ])
  }

  const errorNotification = (data) => {
    notification.error({
      message: data.status.charAt(0).toUpperCase() + data.status.slice(1) || 'Error',
      description: data.response || 'Something went wrong.',
      duration: 4,
      placement: 'bottomRight',
      style: {
        width: 280,
      },
    })
  }

  const fetchAPI = async () => {
    await axios
      .post('/url', {
        url: pathInput,
      })
      .then((res) => {
        updateShortenLinkData([res.data])
        setPathInput('')
      })
      .catch((error) => {
        errorNotification(error.response.data)
        setPathInput('')
      })
    setFetching(false)
  }

  const onClickButton = async () => {
    if (pathInput !== '' && fetching !== true) {
      setFetching(true)
      await fetchAPI()
    } else if (pathInput === '' && fetching !== true) {
      errorNotification({
        status: 'Error',
        response: 'Please enter URL to create.',
      })
    }
  }

  const Loading = <LoadingOutlined style={{ color: 'white' }} spin />

  return (
    <Row>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 16, offset: 4 }}
        xl={{ span: 14, offset: 5 }}
        xxl={{ span: 12, offset: 6 }}
      >
        <span style={styles.clDarkGray}>Enter URL to create shorten link.</span>
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 20, offset: 2 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 16, offset: 4 }}
        xl={{ span: 14, offset: 5 }}
        xxl={{ span: 12, offset: 6 }}
        style={{ marginTop: '0.3rem' }}
      >
        <Row gutter={8} style={styles.fixFont}>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 16 }}
            md={{ span: 14 }}
            lg={{ span: 16 }}
            xl={{ span: 18 }}
            xxl={{ span: 20 }}
          >
            <Input size="large" placeholder="https://www.example.com/" prefix={<LinkOutlined />} value={pathInput} onChange={updatePathInput} />
          </Col>
          <Col
            xs={{ span: 24 }}
            sm={{ span: 8 }}
            md={{ span: 10 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
            xxl={{ span: 4 }}
          >
            <Button
              onClick={onClickButton}
              type="primary"
              size="large"
              style={
              (windowSize.width < 576 && hover) ? styles.orangeBlockButtonHover : (windowSize.width > 576 && hover) ? styles.orangeButtonHover : (windowSize.width < 576) ? styles.orangeBlockButton : styles.orangeButton
              }
              onMouseEnter={toggleHover}
              onMouseLeave={toggleHover}
              block
            >
              { !fetching ? 'Shorten URL' : <Spin indicator={Loading} /> }
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default LinkInput
