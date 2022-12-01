import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './dropdown-item'
import Cell from '../cell'
import Icon from '../icon'

const DropdownOption = props => {
	const {
		value,
		text,
		icon,
		actived,
		onClick
	} = props

	const title = (
		<view 
			className={bemElement(BLOCK, 'title')}
		>
			{text}
		</view>
	)

	return withNativeProps(
		props,
		<Cell 
			data-value={value}
			icon={icon}
			title={title}
			clickable
			onClick={onClick}
		>
			{
				actived
				&&
				<Icon 
					name="success" 
					className={bemElement(BLOCK, 'icon')} 
				/>
			}
		</Cell>
	)
}

DropdownOption.propTypes = {
	actived: PropTypes.bool,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	text: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired
}

export default React.memo(DropdownOption)