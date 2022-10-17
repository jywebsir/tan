import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './index-bar'

const IndexBarIndex = props => {
	const { 
		actived, 
		index,
		children,
		onClick 
	} = props

	return withNativeProps(
		props,
		<view 
			data-index={index}
			className={bemElement(BLOCK, 'index', {actived})}
			onTap={onClick}
		>
			{children}
		</view>
	)
}

IndexBarIndex.propTypes = {
	index: PropTypes.number.isRequired,
	actived: PropTypes.bool,
	onClick: PropTypes.func.isRequired
} 

IndexBarIndex.defaultProps = {
	actived: false
}

export default React.memo(IndexBarIndex)