import React, { useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn, useMount, useUpdateEffect } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getBoundingClientRect } from '../../utils/helpers'
import Cell from '../cell'

const BLOCK = 'collapse-item'

export const CollpaseItem = (props) => {
	const ref = useRef()

	const {
		name,
		title,
		icon,
		rightIcon,
		value,
		label,
		disabled,
		clickable,
		border,
		accordion,
		activedName,
		hairlineTop,
		children,
		onSwitch
	} = props

	const [expanded, setExpanded] = useState(false)
	const [contentHeight, setContentHeight] = useState(0)

	const updateExpanded = useMemoizedFn(() => {
		const isExpanded = 
			accordion
			? 
			activedName === name
			: 
			(activedName || []).some((itemName) => itemName === name)

		setExpanded(isExpanded)
	})

	const onClick = useMemoizedFn(() => {
		if (disabled) {
			return
		}

		onSwitch(name, !expanded)
	}) 

	const setContentAnimate = useMemoizedFn(() => {
		getBoundingClientRect(
			`#${ref.current.id}`,
			function(rect) {
				const { height } = rect
	
				setContentHeight(height)			
			}
		)
	})

	useMount(() => {
		updateExpanded()
	})

	useUpdateEffect(() => {
		updateExpanded()	
	}, [activedName, accordion])

	useUpdateEffect(() => {
		if (expanded) {
			setContentAnimate()
		}else {
			setContentHeight(0)
		}
	}, [expanded, children.length])

	return withNativeProps(
		props,
		<view 
			className={classNames(
				bemBlock(BLOCK), 
				hairlineTop&&'tan-hairline--top'
			)}
		>
			<Cell
				title={title}
				icon={icon}
				value={value}
				label={label}
				rightIcon={rightIcon}
				clickable={clickable && !disabled}
				border={border && expanded}
				className={bemElement(BLOCK, 'title', {disabled, expanded})}
				onClick={onClick}
			/>

			<view 
				className={bemElement(BLOCK, 'wrapper')}
				style={{height: contentHeight}}
			>
				<view 
					id={ref.current ? ref.current.uid : null}
					ref={ref} 
					className={bemElement(BLOCK, 'content')}
				>{children}</view>
			</view>
		</view>
	)
}

CollpaseItem.propTypes = {
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	title: PropTypes.node, 
	icon: PropTypes.node,
	rightIcon: PropTypes.node,
	value: PropTypes.node,
	label: PropTypes.string,
	disabled: PropTypes.bool,
	clickable: PropTypes.bool,
	border: PropTypes.bool,
	hairlineTop: PropTypes.bool,
	accordion: PropTypes.bool,
	activedName: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number, 
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))]
	),
	onSwitch: PropTypes.func.isRequired
} 

CollpaseItem.defaultProps = {
	border: true,
	hairlineTop: true,
	rightIcon: true,
	clickable: true
}