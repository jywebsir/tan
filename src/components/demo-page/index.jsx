import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.module.scss'

const DemoPage = (props) => {
  const { 
    className,
    children
  } = props

  return (
    <view
      className={classNames(
        style.container, 
        className
      )}
    >
      {children}
    </view>
  )
}

DemoPage.propTypes = {
  className: PropTypes.string
}

export default DemoPage