import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props' 
import { bemBlock, bemElement } from '../../utils/class-name'
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './step'

const BLOCK = 'steps'

const getStepStatus = (index, active) => {
	if (index < active) {
    return 'finish'
  } 
	
	if (index === active) {
    return 'process'
  }

  return 'inactive'
}

export const Steps = props => {
	const { 
		active, 
		direction, 
		activeIcon, 
		steps, 
		onClickStep 
	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			<view className={bemElement(BLOCK, 'wrapper')}>
			{
				steps.map(({
					text,
					desc,
					activeIcon,
					inactiveIcon	
				}) => {

				})
			}
			</view>
		</view>
	)
}

Steps.propTypes = {
	active: PropTypes.number,
	direction: PropTypes.oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
	activeIcon: PropTypes.string,
	steps: PropTypes.shape({
		text: PropTypes.string.isRequired,
		desc: PropTypes.string,
		activeIcon: PropTypes.string,
		inactiveIcon: PropTypes.string
	}).isRequired,
	onClickStep: PropTypes.func
}

Steps.defaultProps = {
	active: 0,
	activeIcon: 'checked',
	direction: DIRECTION_HORIZONTAL
}
