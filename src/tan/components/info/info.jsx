import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = 'tan-info'

export const Info = props => {
	const {
		dot,
		info
	} = props

	if (!!info || dot) {
		return withNativeProps(
			props,
			<view className={classNames(
				classPrefix,
				dot && `${classPrefix}--dot`
			)}>{info}</view>
		)
	}

	return null
}

Info.propTypes = {
	dot: PropTypes.bool,
	info: PropTypes.string
}

Info.defaultProps = {
	dot: true,
	info: null
}