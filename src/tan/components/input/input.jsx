import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn, useDebounceFn } from 'ahooks'
import { Input as TaroInput } from '@tarojs/components'
import Icon from '../icon'
import { usePropsValue } from '../../hooks/use-props-value'
import { bound } from '../../utils/bound'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = `tam-input`

export const Input = forwardRef((props, ref) => {
	const {
		type,
		min,
		max,
		maxLength,
		placeholder,
		placeholderClass,
		autoFocus,
		disabled,
		clearable,
		readOnly,
		onFocus,
		onBlur,
		onConfirm,
		onClear
	} = props

	const [value, setValue] = usePropsValue(props)
	const [hasFocus, setHasFocus] = useState(false)

	const isDisabled = disabled || readOnly
	const isFocused = autoFocus || hasFocus
	const isPassword = type === 'password'

	const inputType = type === 'password' ? 'safe-password' : type

  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('')
			onClear?.()	
    },
		focus: () => {
			setHasFocus(true)
		}
  }))

	const checkValue = () => {
    let nextValue = value

    if (type === 'number') {
      nextValue =
        nextValue &&
        bound(parseFloat(nextValue), min, max).toString()
    }

    if (nextValue !== value) {
      setValue(nextValue)
    }
  }

	const handleClickClear = useMemoizedFn((e) => {
		e.stopPropagation()

		setValue('')
		onClear?.()	
	})

	const { run: handleInput } = useDebounceFn((e) => {
		setValue(e.detail.value)	
	}, {
		wait: 250 
	})

	const onInput = useMemoizedFn(handleInput)

	const handleFocus = useMemoizedFn((e) => {
		setHasFocus(true)
		onFocus?.(e)	
	})

	const handleBlur = useMemoizedFn((e) => {
		setHasFocus(false)
		checkValue()
		onBlur?.(e)	
	})

	const handleConfirm = useMemoizedFn((e) => {
		onConfirm?.(e)	
	})

	return withNativeProps(
		props,
		<view className={classNames(
			`${classPrefix}`,
			disabled && `${classPrefix}-disabled`
		)}>
			<TaroInput
        className={`${classPrefix}-element`}
				type={type}
        value={value}
				placeholder={placeholder}
				placeholderClass={placeholderClass}
        disabled={isDisabled}
        maxlength={maxLength}
				password={isPassword}
        focus={isFocused}
        onInput={onInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
				onConfirm={handleConfirm}
      />

			{
				clearable
				&&
				!!value
				&&
				!readOnly
				&&
				(
					<view
						className={classNames(
							`${classPrefix}-clear`,
							hasFocus&&`${classPrefix}-clear-actived`
						)}
						onTap={handleClickClear}
					>
						<Icon 
							name="close-circle-fill" 
							className={`${classPrefix}-clear-icon`}
						/>
					</view>
				)
			}
		</view>
	)
})

Input.propTypes = {
	type: PropTypes.oneOf([
		'text', 
		'number', 
		'idcard', 
		'digit', 
		'password', 
		'nickname'
	]),
	value: PropTypes.string,
	defaultValue: PropTypes.string,
	placeholder: PropTypes.string,
	placeholderClass: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	maxLength: PropTypes.number,
	disabled: PropTypes.bool,
	clearable: PropTypes.bool,
	autoFocus: PropTypes.bool,
	readOnly: PropTypes.bool,
	onClear: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onConfirm: PropTypes.func
}

Input.defaultProps = {
	type: 'text',
	placeholder: '请输入',
	defaultValue: '',
	maxLength: 140
}

