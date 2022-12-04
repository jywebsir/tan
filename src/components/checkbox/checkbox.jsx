import { forwardRef, useImperativeHandle } from 'react'
import ProTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { usePropsValue } from '../../hooks/use-props-value'

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
		shape,
		checked,
		defaultChecked,
		labelPosition,
		labelDisabled,
		icon
	} = props

	let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange: props.onChange
  })

	let disabled = props.disabled
	let direction = null

	const labelClass = bemElement(BLOCk, 'label', [labelPosition, {disabled}])

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

			<view className={bemElement(BLOCK, 'icon-wrap')}>

			</view>
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
	icon: PropTypes.element,
	onChange: PropTypes.func
}

Checkbox.defaultProps = {
	shape: SHAPE_ROUND,
	checked: false,
	defaultChecked: false,
	disabled: false,
	labelPosition: POSITION_RIGHT,
	labelDisabled: false
}