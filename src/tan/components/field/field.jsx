import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn, useDebounceFn } from 'ahooks'
import { Input, Textarea } from '@tarojs/components'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isString, isNumber } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import { nextTick } from '../../utils/helpers'
import Cell from '../cell'
import Icon from '../icon'

const BLOCK = 'field'

export const Field = props => {
	const {
		type,
		value,
		placeholder,
		disabled,
		maxlength,
		cursorSpacing,
		autoFocus,
		focus,
		cursor,
		selectionStart,
		selectionEnd,
		adjustPosition,
		holdKeyboard,
		password,
		confirmType,
		confirmHold,
		alwaysEmbed,
		fixed,
		showConfirmBar,
		size,
		label,
		error,
		center,
		clearIcon,
		leftIcon,
		rightIcon,
		autosize,
		required,
		clickable,
		inputAlign,
		errorMessage,
		errorMessageAlign,
		arrowDirection,
		showWordLimit,
		border,
		readonly,
		disableDefaultPadding,
		clearable,
		clearTrigger,
		inputEl,
		rightButton,
		onClickInput,
		onClear,
		onChange,
		onFocus,
		onBlur,
		onConfirm,
		onClickIcon,
		onLineChange,
		onKeyboardHeightChange
	} = props

	const [focused, setFocused] = useState(false)
	const [showClear, setShowClear] = useState(false)

	const updateShowClear = useMemoizedFn(() => {
		let showClearValue = false

		if (clearable && !readonly) {
			const hasValue = !!value
			
			const trigger = clearTrigger === 'always' || (clearTrigger === 'focus' && focused)

			showClearValue = hasValue && trigger
		}

		setShowClear(showClearValue)
	})

	const { run: handleInput } = useDebounceFn(
    (event) => {
			const { value: val = '' } = event.detail || {}	

			if (onChange) {
				onChange(val)
			}	
    },
    {
      wait: 200
    }
  )

	const handleFocus = useMemoizedFn((event) => {
		setFocused(true)

		if (onFocus) {
			onFocus(event.detail)
		}
	})

	const handleBlur = useMemoizedFn((event) => {
		setFocused(false)

		if (onBlur) {
			onBlur(event.detail)
		}
	})

	const handleLineChange = useMemoizedFn((event) => {
		if (onLineChange) {
			onLineChange(event.detail)
		}
	})

	const handleKeyboardHeightChange = useMemoizedFn((event) => {
		if (onKeyboardHeightChange) {
			onKeyboardHeightChange(event.detail)
		}
	})

	useEffect(() => {
		updateShowClear()
	}, [
		value, 
		focused,
		clearable,
		readonly,
		clearTrigger,
		updateShowClear
	]) 

	const renderCellTitle = () => {
		if (!label) {
			return null
		}

		if (isString(label) || isNumber(label)) {
			return (
				<view className={bemElement(BLOCK, 'label', {disabled})}>
					{label}
				</view>	
			)
		}

		return label
	}

	const renderField = () => {
		if (type === 'textarea') {
			return (
				<Textarea
					value={value}
					fixed={fixed}
					focus={focus}
					cursor={cursor}
					autoFocus={autoFocus}
					disabled={disabled || readonly}
					maxlength={maxlength}
					placeholder={placeholder}
					placeholderClass={bemElement(BLOCK, 'placeholder', {error, disabled})}
					autoHeight={!!autosize}
					cursorSpacing={cursorSpacing}
					adjustPosition={adjustPosition}
					showConfirmBar={showConfirmBar}
					holdKeyboard={holdKeyboard}
					selectionStart={selectionStart}
					selectionEnd={selectionEnd}
					disableDefaultPadding={disableDefaultPadding}
					className={bemElement(
						BLOCK, 
						'control', 
						[
							inputAlign, 
							type, 
							{ disabled, error }
						]
					)}	
					onInput={handleInput}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onConfirm={onConfirm}
					onLineChange={handleLineChange}
					onKeyboardHeightChange={handleKeyboardHeightChange}
				/>
			)
		}

		return(
			<Input
				type={type}
				focus={focus}
				cursor={cursor}
				value={value}
				autoFocus={autoFocus}
				disabled={disabled || readonly}
				maxlength={maxlength}
				placeholder={placeholder}
				placeholderClass={bemElement(BLOCK, 'placeholder', {error})}
				confirmType={confirmType}
				confirmHold={confirmHold}
				holdKeyboard={holdKeyboard}
				cursorSpacing={cursorSpacing}
				adjustPosition={adjustPosition}
				selectionStart={selectionStart}
				selectionEnd={selectionEnd}
				alwaysEmbed={alwaysEmbed}
				password={password || type === 'password'}
				className={
					bemElement(
						BLOCK, 
						'control', 
						[inputAlign, { disabled, error }]
					)
				}	
				onInput={handleInput}
				onBlur={handleBlur}
				onFocus={handleFocus}
				onConfirm={onConfirm}
				onKeyboardHeightChange={handleKeyboardHeightChange}
			/>
		)
	}

	const renderRightIcon = () => {
		if (isString(rightIcon)) {
			return (
				<Icon 
					name={rightIcon} 
					className={bemElement(BLOCK, 'icon-root')}
				/>
			)
		}

		return rightIcon
	}

	return withNativeProps(
		props,
		<Cell 
			icon={leftIcon}
			title={renderCellTitle()}
			size={size}
			center={center}
			border={border}
			required={required}
			clickable={clickable}
			arrowDirection={arrowDirection}
			className={bemBlock(BLOCK)}
		>
			<view className={bemElement(BLOCK, 'body', [type])}>
				<view 
					className={bemElement(BLOCK, 'control', [inputAlign, 'custom'])}
					onTap={onClickInput}
				>
					{inputEl}
				</view>

				{renderField()}

				{
					showClear
					&&
					<Icon 
						name={clearIcon} 
						className={classNames(
							bemElement(BLOCK, 'clear-root'),
							bemElement(BLOCK, 'icon-root')
						)} 
						onClick={onClear}
					/>
				}

				<view 
					className={bemElement(BLOCK, 'icon-container')}
					onTap={onClickIcon}
				>
					{renderRightIcon()}
				</view>

				<view className={bemElement(BLOCK, 'button')}> 
					{rightButton}
				</view>
			</view>

			{
				showWordLimit
				&&
				maxlength
				&&
				<view className={bemElement(BLOCK, 'word-limit')}>
					<view className={bemElement(
						BLOCK, 
						'word-num', 
						{full: value.length >= maxlength}
					)}>
						{value.length >= maxlength ? maxlength : value.length}
					</view>
					/{maxlength}
				</view>
			}

			{
				errorMessage
				&&
				<view className={bemElement(
					BLOCK, 
					'error-message', 
					[errorMessageAlign, {disabled, error}]
				)}>{errorMessage}</view>
			}
		</Cell>
	)
}

Field.propTypes = {
	type: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	disabled: PropTypes.bool,
	maxlength: PropTypes.number,
	cursorSpacing: PropTypes.number,
	autoFocus: PropTypes.bool,
	focus: PropTypes.bool,
	cursor: PropTypes.number,
	selectionStart: PropTypes.number,
	selectionEnd: PropTypes.number,
	adjustPosition: PropTypes.bool,
	holdKeyboard: PropTypes.bool,
	password: PropTypes.bool,
	confirmType: PropTypes.string,
	confirmHold: PropTypes.bool,
	alwaysEmbed: PropTypes.bool,
	fixed: PropTypes.bool,
	showConfirmBar: PropTypes.bool,	
	size: PropTypes.string,
	label: PropTypes.string,
	error: PropTypes.bool,
	center: PropTypes.bool,
	clearIcon: PropTypes.string,
	leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	autosize: PropTypes.bool,
	required: PropTypes.bool,
	clickable: PropTypes.bool,
	inputAlign: PropTypes.oneOf(['center', 'left', 'right']),
	errorMessage: PropTypes.string,
	errorMessageAlign: PropTypes.oneOf(['right', 'center']),
	arrowDirection: PropTypes.oneOf(['left', 'up', 'down']),
	showWordLimit: PropTypes.bool,
	border: PropTypes.bool,
	readonly: PropTypes.bool,
	disableDefaultPadding: PropTypes.bool,
	clearable: PropTypes.bool,	
	clearTrigger: PropTypes.oneOf(['focus', 'always']),
	inputEl: PropTypes.node,
	rightButton: PropTypes.node,
	onClickInput: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onConfirm: PropTypes.func,
	onLineChange: PropTypes.func,
	onKeyboardHeightChange: PropTypes.func,
	onClickIcon: PropTypes.func,
	onChange: PropTypes.func
} 

Field.defaultProps = {
	type: 'text',
	maxlength: -1,
	cursor: -1,
	selectionStart: -1,
	selectionEnd: -1,
	cursorSpacing: 50,
	adjustPosition: true,
	holdKeyboard: true,	
	showConfirmBar: true,
	border: true,
	disableDefaultPadding: true,
	clearTrigger: 'focus',
	clearIcon: 'clear'
}

export default React.memo(Field)