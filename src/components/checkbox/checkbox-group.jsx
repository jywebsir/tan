import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import CheckboxGroupContext from './checkbox-group-context'
import usePropsValue from '../../hooks/use-props-value'

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
			<CheckboxGroupContext.Provider
				value={{
					value,
					shape,
					direction,
					disabled,
					check: v => {
						if (Array.isArray(value)) {
							setValue([...value, v])
						}else {
							setValue([v])
						}
					},
					uncheck: (v) => {
						setValue(value.filter(item => item !== v))
					},
				}}
			>
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