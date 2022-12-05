import { forwardRef, useContext, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import isDev from '../../utils/is-dev'
import { isFunction } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import usePropsValue from '../../hooks/use-props-value'
import Icon from '../icon'
import CheckboxGroupContext from './checkbox-group-context'

const BLOCK = 'checkbox'

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'
export const SHAPE_ROUND = 'round'
export const SHAPE_SQUARE = 'square'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

export const Checkbox = forwardRef((props, ref) => {
	const {
		value,
		labelPosition,
		labelDisabled,
		icon,
		children,
		onChange
	} = props

	let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  })

	const groupContext = useContext(CheckboxGroupContext)

	let disabled = props.disabled
	const shape = groupContext ? groupContext.shape : props.shape
	const direction = groupContext ? groupContext.direction : null

	const labelClass = bemElement(BLOCK, 'label', [labelPosition, {disabled}])

	if (groupContext && value !== undefined) {
    if (isDev) {
      if (props.checked !== undefined) {
				console.warn('Checkbox在`Checkbox.Group`中使用时，`checked`属性是不起作用的.')
      }
      if (props.defaultChecked !== undefined) {
				console.warn('Checkbox在`CheckBox.Group`中使用时，`defaultChecked`属性是不起作用的.')
      }
    }

    checked = Array.isArray(groupContext.value) && groupContext.value.includes(value)
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

	useImperativeHandle(ref, () => ({
    check: () => {
      setChecked(true)
    },
    uncheck: () => {
      setChecked(false)
    },
    toggle: () => {
      setChecked(!checked)
    },
  }))

	const onClickLabel = useMemoizedFn(() => {
		if (!disabled && !labelDisabled) {
			setChecked(!checked)
		}
	})

	const onClickIcon = useMemoizedFn(() => {
		if (!disabled) {
			setChecked(!checked)
		}
	})

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