import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import RadioGroupContext from './radio-group-context'
import useRadioGroup from './use-radio-group'

import { 
	DIRECTION_HORIZONTAL, 
	DIRECTION_VERTICAL, 
	SHAPE_ROUND, 
	SHAPE_SQUARE 
} from './radio'

const BLOCK = 'radio-group'

export const RadioGroup = props => {
	const {
		direction,
		contextValue
	} = useRadioGroup(props)

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			<RadioGroupContext.Provider
				value={contextValue}
			>
				{props.children}
			</RadioGroupContext.Provider>
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
	shape: SHAPE_ROUND,
	direction: DIRECTION_VERTICAL
}