import { forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import pick from 'lodash/pick'
import isDev from '../../utils/is-dev'
import { isFunction } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Icon from '../icon'
import CheckboxGroupContext from './checkbox-group-context'
import useCheckbox from './use-checkbox'

const BLOCK = 'checkbox'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'
export const SHAPE_ROUND = 'round'
export const SHAPE_SQUARE = 'square'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

export const Checkbox = forwardRef((props, ref) => {
	const {
		icon,
		labelPosition,
		children
	} = props

	const groupContext = useContext(CheckboxGroupContext)

	const {
		direction,
		shape,
		disabled,
		checked,
		onClickLabel,
		onClickIcon	
	} = useCheckbox({
		...pick(
			props, 
			[
				'value', 
				'shape', 
				'checked', 
				'defaultChecked',
				'labelDisabled',
				'disabled',
				'onChange'	
			]
		),
		groupContext,
		ref
	})

	const labelClass = bemElement(BLOCK, 'label', [labelPosition, {disabled}])

	return withNativeProps(
		props,
		<view className={
			bemBlock(
				BLOCK, 
				{horizontal: direction === DIRECTION_HORIZONTAL}
			)
		}>
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

			<view className={bemElement(BLOCK, 'icon-wrap')} onTap={onClickIcon}>
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
})

Checkbox.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number
	]),
	shape: PropTypes.oneOf([SHAPE_ROUND, SHAPE_SQUARE]),
	checked: PropTypes.bool,
	defaultChecked: PropTypes.bool,
	disabled: PropTypes.bool,
	labelPosition: PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),
	labelDisabled: PropTypes.bool,
	icon: PropTypes.func,
	onChange: PropTypes.func
}

Checkbox.defaultProps = {
	shape: SHAPE_SQUARE,
	disabled: false,
	labelPosition: POSITION_RIGHT,
	labelDisabled: false
}