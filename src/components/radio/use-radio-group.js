import usePropsValue from '../../hooks/use-props-value'
import { useMemoizedFn } from 'ahooks'

const useRadioGroup = props => {
	const {
		shape,
		direction,
		disabled
	} = props

	const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      if (v === null) return
      props.onChange?.(v)
    },
  })

	const handleCheck = useMemoizedFn(v => {
		setValue(v)
	})

	const handleUnCheck = useMemoizedFn(() => {})

	const contextValue = {
		value,
		shape,
		direction,
		disabled,
		check: handleCheck,
		uncheck: handleUnCheck
	}

	return {
		direction,
		contextValue
	}
}

export default useRadioGroup 