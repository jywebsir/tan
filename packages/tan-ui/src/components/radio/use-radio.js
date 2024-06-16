import { useMemoizedFn } from 'ahooks'
import usePropsValue from '../../hooks/use-props-value'
import isDev from '../../utils/is-dev'

const useRadio = props => {
	const {
		value,
		labelDisabled,
		groupContext,
		onChange
	} = props

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

	return {
		shape,
		direction,
		checked,
		disabled,
		onClickLabel,
		onClickIcon
	}
}

export default useRadio 