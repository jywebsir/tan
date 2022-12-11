import usePropsValue from '../../hooks/use-props-value'

const useCheckboxGroup = (props) => {
	const {
		direction,
		shape,
		disabled
	} = props

	const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    }
  })

	const contextValue = {
		value,
		shape,
		direction,
		disabled,
		check: v => {
			if (Array.isArray(value)) {
				setValue([...value, v])
			}else {
				setValue([v])
			}
		},
		uncheck: (v) => {
			setValue(value.filter(item => item !== v))
		},
	}

	return {
		direction,
		contextValue
	}
}

export default useCheckboxGroup
