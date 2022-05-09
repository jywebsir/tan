import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = `tan-flex`

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

	const clsName = classNames(classPrefix, {
		[`${classPrefix}--wrap`]: wrap,
		[`${classPrefix}--${direction}`]: true,
		[`${classPrefix}--block`]: block,
		[`${classPrefix}--align-${align}`]: !!align,
		[`${classPrefix}--justify-${justify}`]: !!justify,
	})

	return withNativeProps(
		props,
		<view className={clsName} onTap={onClick}>
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


