import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { isElement } from "react-is"
import { useMemoizedFn } from 'ahooks'
import Icon from '../icon'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import usePropsValue from '../../hooks/use-props-value'
import { isFunction } from '../../utils/validator'
import isDev from '../../utils/is-dev'
import RadioGroupContext from './radio-group-context'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'
export const SHAPE_ROUND = 'round'
export const SHAPE_SQUARE = 'square'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

const BLOCK = 'radio'

export const Radio = props => {
	const {
		value,
		labelDisabled,
		labelPosition,
		icon,
		children,
		onChange
	} = props

	const groupContext = useContext(RadioGroupContext)

	let disabled = props.disabled
	const shape = groupContext ? groupContext.shape : props.shape
	const direction = groupContext ? groupContext.direction : null

	let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange
  })

  if (groupContext && value !== undefined) {
    if (isDev) {
      if (props.checked !== undefined) {
				console.warn('Radio在`Radio.Group`中使用时，`checked`属性是不起作用的.')
      }
      if (props.defaultChecked !== undefined) {
				console.warn('Radio在`Radio.Group`中使用时，`defaultChecked`属性是不起作用的.')
      }
    }

    checked = groupContext.value === value
    setChecked = (innerChecked) => {
      if (innerChecked) {
        groupContext.check(value)
      } else {
        groupContext.uncheck(value)
      }
      onChange?.(innerChecked)
    }

    disabled = disabled || groupContext.disabled
  }

	const onClickLabel = () => {
		if (!disabled && !labelDisabled) {
			setChecked(!checked)
		}
	}

	const onClickIcon = useMemoizedFn(() => {
		if (!disabled) {
			setChecked(!checked)
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
	defaultChecked: false,
	disabled: false,
	labelPosition: POSITION_RIGHT,
	labelDisabled: false
}
