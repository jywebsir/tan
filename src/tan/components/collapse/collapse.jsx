import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import { isFunction } from '../../utils/validator'

const BLOCK = 'collapse'

export const Collpase = props => {
	const { 
		value, 
		accordion, 
		border, 
		onOpen, 
		onClose, 
		onChange 
	} = props

	const onSwitch = useMemoizedFn((name, expanded) => {
		const changeItemName = name
		let resultName

		if (!accordion) {
			resultName = expanded
				? (value || []).concat(name)
				: (value || []).filter(
						(activeName) => activeName !== name
					);
		} else {
			resultName = expanded ? name : '';
		}

		if (expanded) {
			if (isFunction(onOpen)) {
				onOpen(changeItemName)
			}
		} else {
			if (isFunction(onClose)) {
				onClose(changeItemName)
			}
		}

		onChange(resultName)
	})

	return withNativeProps(
		props,
		<view className={
			classNames(
				bemBlock(BLOCK), 
				border&&'tan-hairline--top-bottom'
			)
		}>
			{
				React.Children.map(props.children, item => {
					return (
						item !== null
						&&
						item !== undefined
						&&
						React.cloneElement(item, {
							...item.props,
							accordion,
							activedName: value,
							onSwitch
						})
					)
				})
			}
		</view>
	)
}

Collpase.propTypes = {
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number, 
		PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string, 
				PropTypes.number
			])
		)]
	),
	accordion: PropTypes.bool,
	border: PropTypes.bool,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onChange: PropTypes.func.isRequired
} 

Collpase.defaultProps = {
	border: true,
	accordion: false
}