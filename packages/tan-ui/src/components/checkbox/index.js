import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import './checkbox.scss'
import './checkbox-group.scss'

export {
	DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL,
	SHAPE_ROUND,
	SHAPE_SQUARE,
	POSITION_LEFT,
	POSITION_RIGHT
} from './checkbox'

export {default as useCheckbox} from './use-checkbox'
export {default as useCheckboxGroup} from './use-checkbox-group'

export default attachPropertiesToComponent(
	React.memo(Checkbox), 
	{
		Group: React.memo(CheckboxGroup)
	}
)

