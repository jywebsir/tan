import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isElement } from '../../utils/validator'
import Field from '../field'

const BLOCK = 'search'

export const Search = props => {
	const { 
		value,
		label, 
		showAction,
		action, 
		shape, 
		leftIcon,
		rightIcon,
		focus,
		error,
		disabled,
		readonly,
		clearable,
		clearTrigger,
		clearIcon,
		maxlength,
		inputAlign,
		placeholder,
		fieldClass,
		cancelClass,
		onBlur,
		onFocus,
		onChange,
		onSearch,
		onClear,
		onCancel,
		onClickInput
	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, {withaction: showAction})}>
			<view className={bemElement(BLOCK, 'content', [shape])}>
				{
					label
					&&
					(
						isElement(label)
						?
						label
						:
						<view className={bemElement(BLOCK, 'label')}>{label}</view>
					)
				}

				<Field 
					type="search"
					confirmType="search"
					value={value}
					leftIcon={leftIcon}
					rightIcon={rightIcon}
					focus={focus}
					error={error}
					disabled={disabled}
					readonly={readonly}
					clearable={clearable}
					clearTrigger={clearTrigger}
					clearIcon={clearIcon}
					maxlength={maxlength}
					inputAlign={inputAlign}
					placeholder={placeholder}
					border={false}
					className={classNames(bemElement(BLOCK, 'field'), fieldClass)}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					onConfirm={onSearch}
					onClear={onClear}
					onClickInput={onClickInput}
				/>
			</view>

			{
				showAction	
				&&
				<view 
					className={bemElement(BLOCK, 'action')}
					hoverClass={bemElement(BLOCK, 'acwrapper', {hover: true})}
				>
					{
						isElement(action)
						?
						action
						:
						<view 
							onTap={onCancel} 
							className={cancelClass}
						>{action}</view>
					}
				</view>
			}
		</view>
	)
}

Search.propTypes = {
	label: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	focus: PropTypes.bool,
	error: PropTypes.bool,
	disabled: PropTypes.bool,
	readonly: PropTypes.bool,
	inputAlign: PropTypes.oneOf(['center', 'left', 'right']),
	leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	placeholder: PropTypes.string,
	showAction: PropTypes.bool,
	action: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	maxlength: PropTypes.number,
	shape: PropTypes.oneOf(['square', 'round']),
	clearable: PropTypes.bool,
	clearTrigger: PropTypes.oneOf(['focus', 'always']),
	clearIcon: PropTypes.string,
	fieldClass: PropTypes.string,
	cancelClass: PropTypes.string,
	onCancel: PropTypes.func,
	onBlur: PropTypes.func,
	onFocus: PropTypes.func,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	onClear: PropTypes.func,
	onClickInput: PropTypes.func,
}

Search.defaultProps = {
	action: '取消',
	leftIcon: 'search',
	maxlength: -1,
	shape: 'square',
	clearable: true,
	showAction: false,
	clearTrigger: 'focus',
	clearIcon: 'clear'
}