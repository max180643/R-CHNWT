import React from 'react'
import {
  Row, Col, Card, notification,
} from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRecoilValue } from 'recoil'

import { ShortenLink as ShortenLinkData } from '../states/atom'

const styles = {
  clOrange: {
    color: '#ff571c',
  },
  clDarkGray: {
    color: '#172e41',
  },
  titleText: {
    paddingTop: '2vh',
    paddingBottom: '1vh',
  },
  shortenLink: {
    fontSize: '1.4em',
  },
  copyLink: {
    fontSize: '1.1em',
    color: '#2a97ff',
    cursor: 'pointer',
  },
  cardSpace: {
    marginBottom: '2vh',
  },
  headPadding: {
    paddingLeft: '1em',
    paddingRight: '1em',
  },
  bodyPadding: {
    paddingTop: '1em',
    paddingBottom: 0,
    paddingLeft: '1em',
    paddingRight: '1em',
    wordWrap: 'break-word',
  },
}

const copyNotification = () => {
  notification.success({
    icon: <CopyOutlined style={styles.clOrange} />,
    message: 'Copied to clipboard',
    duration: 1.5,
    placement: 'bottomRight',
    style: {
      width: 280,
    },
  })
}

const ShortenLinkItem = (LinkData) => (
  LinkData.data.map((item) => (
    <Card
      key={item.id}
      style={styles.cardSpace}
      headStyle={styles.headPadding}
      bodyStyle={styles.bodyPadding}
      title={(<span style={{ ...styles.clOrange, ...styles.shortenLink }}>{item.shortUrl.includes('https://') ? item.shortUrl.replace('https://', '') : item.shortUrl.replace('http://', '')}</span>)}
      extra={<CopyToClipboard text={item.shortUrl}><div style={styles.copyLink} onClick={() => { copyNotification() }} aria-hidden="true">Copy <CopyOutlined /></div></CopyToClipboard>}
    >
      <p style={styles.clDarkGray}>Full URL: <a href={item.fullUrl}>{item.fullUrl}</a></p>
    </Card>
  ))
)

const ShortenLink = () => {
  const data = useRecoilValue(ShortenLinkData)
  if (data.length > 0) {
    return (
      <Row>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 18, offset: 3 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 14, offset: 5 }}
          xxl={{ span: 12, offset: 6 }}
          style={styles.titleText}
        >
          <span style={styles.clDarkGray}>Your shortened URL</span>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 20, offset: 2 }}
          md={{ span: 18, offset: 3 }}
          lg={{ span: 16, offset: 4 }}
          xl={{ span: 14, offset: 5 }}
          xxl={{ span: 12, offset: 6 }}
        >
          <ShortenLinkItem data={data} />
        </Col>
      </Row>
    )
  }
  return null
}

export default ShortenLink
