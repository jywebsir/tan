import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'

const BLOCK = 'flex'

export const Flex = props => {
	const { 
		direction, 
		justify,
		block,
		align,
		wrap,
		children,
		onClick 
	} = props

	return withNativeProps(
		props,
		<view 
			className={bemBlock(BLOCK, {
				wrap, 
				block, 
				[`align-${align}`]: !!align, 
				[`justify-${justify}`]: !!justify,
				[`${direction}`]: !!direction
			})} 
			onTap={onClick}
		>
			{children}	
		</view>
	) 
}

Flex.propTypes = {
	direction: PropTypes.oneOf([
		'horizontal', 
		'vertical'
	]),
	justify: PropTypes.oneOf([
		'start', 
		'end', 
		'center', 
		'between', 
		'around', 
		'evenly', 
		'stretch'
	]),
	align: PropTypes.oneOf([
		'start', 
		'end', 
		'center', 
		'baseline'
	]),
	wrap: PropTypes.bool,
	block: PropTypes.bool,
	onClick: PropTypes.func
} 

Flex.defaultProps = {
	direction: 'horizontal',
	block: true,
	wrap: false
}


