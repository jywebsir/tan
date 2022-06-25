import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement, getBlockName, getElementName } from '../../utils/class-name'
import { isString } from '../../utils/validator'
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
		children,
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

	return withNativeProps(
		props,
		<view 
			className={blockClassNames} 
			hoverClass={`${BLOCK_NAME}--hover`}
			onTap={onClick}
		>
			{
				isString(icon)
				?
				<Icon 
					name={icon} 
					className={bemElement(BLOCK, 'left-icon-wrap')} 
				/>
				:
				icon
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

			<view className={bemElement(BLOCK, 'value')}>
				{value || children}
			</view>

			{
				rightIcon
				&&
				<view className={bemElement(BLOCK, 'right-icon-wrap')}>
					{
						rightIcon === true
						?
						<Icon name="arrow" className={bemElement(BLOCK, 'right-icon')} />
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
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	title: PropTypes.node,
	value: PropTypes.node,
	label: PropTypes.node,

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