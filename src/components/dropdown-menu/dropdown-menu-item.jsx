import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './dropdown-menu'

const getDisplayTitle = (value, title = null, options = []) => {
	if (title) {
		return title
	}

	const match = options.find((option) => {
		return option.value === value
	})

	if (match) {
		return match.text
	}

	return null
}

const DropdownMenuItem = props => {
	const { 
		disabled, 
		showPopup, 
		direction, 
		activeColor, 
		title,
		value,
		options,
		onClick
	} = props

	const displayTitle = getDisplayTitle(
		value,
		title,
		options
	)

	return withNativeProps(
		props,
		<view 
			className={bemElement(BLOCK, 'item', { disabled })} 
			onTap={onClick}
		>
			<view 
				className={
					bemElement(
						BLOCK, 
						'title-wrapper', 
						{ 
							active: showPopup, 
							down: showPopup === (direction === 'down')
						}
					)
				}
				style={showPopup&&{color: activeColor}}
			>
				<view className={bemElement(BLOCK, 'title')}>{displayTitle}</view>
			</view>
		</view>
	)
}

DropdownMenuItem.propTypes = {
	activeColor: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	disabled: PropTypes.bool,
	showPopup: PropTypes.bool,
	direction: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		icon: PropTypes.string
	})),
	onClick: PropTypes.func.isRequired
} 

export default React.memo(DropdownMenuItem)
