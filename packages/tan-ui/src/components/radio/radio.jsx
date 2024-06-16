import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { isElement } from "react-is"
import { useMemoizedFn } from 'ahooks'
import pick from 'lodash/pick'
import Icon from '../icon'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isFunction } from '../../utils/validator'
import isDev from '../../utils/is-dev'
import RadioGroupContext from './radio-group-context'
import useRadio from './use-radio'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'
export const SHAPE_ROUND = 'round'
export const SHAPE_SQUARE = 'square'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

const BLOCK = 'radio'

export const Radio = props => {
	const {
		labelPosition,
		icon,
		children,
	} = props

	const groupContext = useContext(RadioGroupContext)

	const p = pick(
		props, 
		[
			'value', 
			'checked', 
			'defaultChecked', 
			'shape', 
			'disabled',
			'labelDisabled', 
			'onChange'
		]
	)

	const {
		shape,
		direction,
		checked,
		disabled,
		onClickLabel,
		onClickIcon
	} = useRadio({
		...p,
		groupContext
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
					isFunction(icon)
					?
					icon(checked)
					:
					<Icon 
						name="success" 
						className={bemElement(
							BLOCK, 
							'icon', 
							[shape, {disabled, checked}]
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
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number
	]),
	shape: PropTypes.oneOf([SHAPE_ROUND, SHAPE_SQUARE]),
	disabled: PropTypes.bool,
	labelDisabled: PropTypes.bool,
	labelPosition: PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),
	icon: PropTypes.func,
	onChange: PropTypes.func.isRequired
} 

Radio.defaultProps = {
	shape: SHAPE_ROUND,
	disabled: false,
	labelPosition: POSITION_RIGHT,
	labelDisabled: false
}
