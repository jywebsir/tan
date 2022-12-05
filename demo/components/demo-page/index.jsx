import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '@/utils/native-props'
import style from './style.module.scss'

const DemoPage = (props) => {
	const { bgColor } = props

  const { 
    className,
    children
  } = props

  return withNativeProps(
		props,
    <view
      className={classNames(
        style.container, 
        className
      )}
			style={{backgroundColor: bgColor}}
    >
      {children}
    </view>
  )
}

DemoPage.propTypes = {
  className: PropTypes.string,
	bgColor: PropTypes.string
}

DemoPage.defaultProps = {
	bgColor: '#f4f4f4'
}

export default DemoPage