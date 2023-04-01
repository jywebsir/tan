import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'

const BLOCK = 'info'

export const Info = props => {
	const {
		dot,
		info
	} = props

	if (!!info || dot) {
		return withNativeProps(
			props,
			<view className={bemBlock(BLOCK, {dot})}>{info}</view>
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