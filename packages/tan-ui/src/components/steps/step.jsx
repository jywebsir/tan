import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Icon from '../icon'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'

const BLOCK = 'step'

const Step = props => {
	const { 
		index, 
		text, 
		desc, 
		activeIcon, 
		inactiveIcon, 
		direction,
		status,
		actived,
		onClick 
	} = props	

	return (
		<view 
			data-index={index}
			className={bemBlock(BLOCK, [direction, status])}
			onTap={onClick}
		>
			<view className={bemElement(BLOCK, 'title')}>
				<view>{text}</view>
				{desc && <view>{desc}</view>}
			</view>

			<view className={bemElement(BLOCK, 'circle-container')}>
			</view>
		</view>
	)
}

Step.propTypes = {
	index: PropTypes.number,
	text: PropTypes.string.isRequired,
	desc: PropTypes.string,
	status: PropTypes.string.isRequired,
	activeIcon: PropTypes.string,
	inactiveIcon: PropTypes.string,
	direction: PropTypes.oneOf([DIRECTION_HORIZONTAL, DIRECTION_VERTICAL]),
	actived: PropTypes.bool.isRequired,
	onClick: PropTypes.func
}

export default React.memo(Step)