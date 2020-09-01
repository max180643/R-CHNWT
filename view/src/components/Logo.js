import React, { Fragment } from 'react'
import { LinkOutlined } from '@ant-design/icons'

const styles = {
  clOrange: {
    color: '#ff571c',
  },
  clDarkGray: {
    color: '#172e41',
  },
}

const Logo = () => (
  <Fragment>
    <h1>
      <span style={styles.clOrange}>R</span>
      <span style={styles.clDarkGray}> - </span>
      <span style={styles.clOrange}>CHNWT</span>
      <LinkOutlined style={styles.clDarkGray} />
    </h1>
  </Fragment>
)

export default Logo
