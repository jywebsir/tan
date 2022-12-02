import React from 'react'
import PropTypes from 'prop-types'
import { isElement } from "react-is"
import { useMemoizedFn } from 'ahooks'
import Icon from '../icon'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isFunction } from '../../utils/validator'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'
export const SHAPE_ROUND = 'round'
export const SHAPE_SQUARE = 'square'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

const BLOCK = 'radio'

export const Radio = props => {
	const {
		direction,
		name, 
		value,
		shape,
		disabled,
		labelDisabled,
		labelPosition,
		icon,
		children,
		onChange
	} = props

	const onClickLabel = () => {
		if (!disabled && !labelDisabled) {
			onChange?.(name)
		}
	}

	const onClickIcon = useMemoizedFn(() => {
		if (!disabled) {
			onChange?.(name)
		}
	})

	const labelClass = bemElement(BLOCK, 'label', [labelPosition, {disabled}])

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}>
			{
				labelPosition === POSITION_LEFT
				&&
				<view 
					className={labelClass}
					onTap={onClickLabel}
				>
					{children}
				</view>
			}	

			<view 
				className={bemElement(BLOCK, 'icon-wrap')}
				onTap={onClickIcon}
			>
				{
					isElement(icon)
					?
					icon
					:
					<Icon 
						name="success" 
						className={bemElement(
							BLOCK, 
							'icon', 
							[shape, {disabled, checked: value === name}]
						)}
					/>
				}
			</view>

			{
				labelPosition === POSITION_RIGHT
				&&
				<view 
					className={labelClass} 
					onTap={onClickLabel}
				>
					{children}
				</view>
			}
		</view>
	)
}

Radio.propTypes = {
	direction: PropTypes.oneOf([
		DIRECTION_HORIZONTAL,
		DIRECTION_VERTICAL
	]),
	name: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number
	]).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number
	]),
	shape: PropTypes.oneOf([SHAPE_ROUND, SHAPE_SQUARE]),
	disabled: PropTypes.bool,
	labelDisabled: PropTypes.bool,
	labelPosition: PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),
	icon: PropTypes.element,
	onChange: PropTypes.func.isRequired
} 

Radio.defaultProps = {
	direction: DIRECTION_VERTICAL,
	shape: SHAPE_ROUND,
	labelPosition: POSITION_RIGHT
}
