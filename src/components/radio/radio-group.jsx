import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import RadioGroupContext from './radio-group-context'
import usePropsValue from '../../hooks/use-props-value'

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
		shape,
		disabled
	} = props

	const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			<RadioGroupContext.Provider
				value={{
					value,
					shape,
					direction,
					disabled,
					check: v => {
						setValue(v)
					},
					uncheck: () => {},
				}}
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