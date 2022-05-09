import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement, getBlockName, getElementName } from '../../utils/class-name'
import Icon from '../icon'

const BLOCK = 'cell'
const BLOCK_NAME = getBlockName(BLOCK)

export const Cell = props => {
	const {
		icon,
		title,
		value,
		label,
		size,
		border,
		center,
		clickable,
		rightIcon,
		required,
		hoverClass,
		onClick
	} = props

	const blockClassNames = bemBlock(BLOCK, [
		size, 
		{
			center,
			required,
			clickable,
			borderless: !border,
		}
	])

	return (
		<view 
			className={blockClassNames} 
			hoverClass={`${BLOCK_NAME}--hover`}
		>
			{
				icon
				&&
				<view className={bemElement(BLOCK, 'left-icon-wrap')}>
					{icon}
				</view>
			}
			<view className={bemElement(BLOCK, 'title')}>
				{title}

				{
					label
					&&
					<view className={bemElement(BLOCK, 'label')}>
						{label}	
					</view>
				}
			</view>

			<view className={bemElement(BLOCK, 'value')}>{value}</view>

			{
				rightIcon
				&&
				<view className={bemElement(BLOCK, 'right-icon-wrap')}>
					{
						rightIcon === true
						?
						<Icon name="arrow" />
						:
						rightIcon
					}
				</view>
			}

		</view>
	)
}

Cell.propTypes = {
	icon: PropTypes.node,

	title: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number,
		PropTypes.node
	]),

	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number,
		PropTypes.node
	]),

	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),

	rightIcon: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.node
	]),

	size: PropTypes.string,
	border: PropTypes.bool,
	center: PropTypes.bool,
	clickable: PropTypes.bool,
	required: PropTypes.bool,
	hoverClass: PropTypes.string,
	onClick: PropTypes.func
}

Cell.defaultProps = {
	border: true,
	center: false,
	clickable: false,
	required: false
}