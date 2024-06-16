import { useImperativeHandle } from 'react'
import usePropsValue from '../../hooks/use-props-value'
import isDev from '../../utils/is-dev'
import { useMemoizedFn } from 'ahooks'

const useCheckbox = props => {
	const {
		ref,
		value,
		labelDisabled,
		groupContext,
		onChange
	} = props

	let [checked, setChecked] = usePropsValue({
    value: props.checked,
    defaultValue: props.defaultChecked,
    onChange
  })

	let disabled = props.disabled
	const shape = groupContext ? groupContext.shape : props.shape
	const direction = groupContext ? groupContext.direction : null

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

	return {
		direction,
		shape,
		disabled,
		checked,
		onClickLabel,
		onClickIcon	
	}
}

export default useCheckbox