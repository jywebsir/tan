import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import CheckboxGroupContext from './checkbox-group-context'
import useCheckboxGroup from './use-checkbox-group'

import { 
	DIRECTION_HORIZONTAL, 
	DIRECTION_VERTICAL, 
	SHAPE_ROUND, 
	SHAPE_SQUARE 
} from './checkbox'

const BLOCK = 'checkbox-group'

export const CheckboxGroup = props => {
	const {
		direction,
		contextValue
	} = useCheckboxGroup(props)

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			<CheckboxGroupContext.Provider value={contextValue}>
				{props.children}
			</CheckboxGroupContext.Provider>
		</view>
  )
}

CheckboxGroup.propTypes = {
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

CheckboxGroup.defaultProps = {
	shape: SHAPE_SQUARE,
	direction: DIRECTION_VERTICAL
}