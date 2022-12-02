import React from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { isElement } from "react-is"
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import uniqueId from '../../utils/unique-id'
import { isBoolean } from '../../utils/validator'
import { 
	DIRECTION_HORIZONTAL, 
	DIRECTION_VERTICAL, 
	SHAPE_ROUND, 
	SHAPE_SQUARE 
} from '../radio'

const BLOCK = 'radio-group'

export const RadioGroup = props => {
	const {
		value,
		shape,
		direction,
		disabled,
		onChange,
		children
	} = props

	const mergeProps = {
		value,
		direction,
		onChange
	}

	if (disabled === true) {
		mergeProps.disabled = disabled
	}

	if (shape && [SHAPE_ROUND, SHAPE_SQUARE].includes(shape)) {
		mergeProps.shape = shape
	}

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			{
				React.Children.map(children, (radio) => {
					const key = uniqueId('radio-group-item')

					return React.cloneElement(radio, {
						key,
						...radio.props,
						...mergeProps
					})
				})
			}
		</view>
	)
}

RadioGroup.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	direction: PropTypes.oneOf([
		DIRECTION_HORIZONTAL,
		DIRECTION_VERTICAL
	]),
	shape: PropTypes.oneOf([SHAPE_ROUND, SHAPE_SQUARE]),
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired
} 

RadioGroup.defaultProps = {
	direction: DIRECTION_VERTICAL
}