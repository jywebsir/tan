import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import './radio.scss'
import './radio-group.scss'

export {
	DIRECTION_HORIZONTAL,
	DIRECTION_VERTICAL,
	SHAPE_ROUND,
	SHAPE_SQUARE,
	POSITION_LEFT,
	POSITION_RIGHT
} from './radio'

export default attachPropertiesToComponent(React.memo(Radio), {
  Group: React.memo(RadioGroup),
})