import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { nextTick } from '@tarojs/taro'
import { useMemoizedFn, useLockFn, useUpdateEffect } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Popup from '../popup'
import Cell from '../cell'
import DropdownOption from './dropdown-option'

export const BLOCK = 'dropdown-item'

export const DropdownItem = forwardRef((props, ref) => {
	const {
		index,
		value,
		title,
		disabled,
		options,
		direction,
		overlay,
		duration,
		closeOnClickOverlay,
		children,
		onUpdateData,
		getWrapperStyle,
		onChange,
		onOpen,
		onOpened,
		onClose,
		onClosed
	} = props

	const [transition, setTransition] = useState(true)
	const [showPopup, setShowPopup] = useState(false)
	const [wrapperStyle, setWrapperStyle] = useState()

	const reRender = () => {
		nextTick(() => {
			const opts = options.map((item) => {
				return {...item}
			})

			onUpdateData(index, {
				value,
				title,
				showPopup,
				disabled,
				options: opts	
			})
		})
	}

	const handleClosed = useMemoizedFn(() => {
		onClosed?.()
	})

	const handleSetWrapperStyle = useLockFn(async () => {
		const result = await getWrapperStyle() 

		setWrapperStyle(result)
	})

	const onTapOption = useMemoizedFn((event) => {
		const { value: currentValue } = event.currentTarget.dataset

		setShowPopup(false)
		onClose?.()

		if (value !== currentValue) {
			onChange?.(currentValue)
		}
	})

	const onToggle = useMemoizedFn((show, immediate = false) => {
		const isShow = typeof show !== 'boolean' ? !showPopup : show

		if (isShow === showPopup) {
			return
		}

		setTransition(!immediate)
		setShowPopup(isShow)

		if (isShow) {
			handleSetWrapperStyle()	
		}
	})

	useImperativeHandle(ref, () => ({
		toggle: onToggle	
  }))

	useEffect(() => {
		reRender()
	}, [
		value,
		title,
		disabled,
		options,
		showPopup	
	])

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [direction])}  style={wrapperStyle}>
			<Popup 
				show={showPopup}
				overlay={overlay}
				position={direction === 'down' ? 'top' : 'bottom'}
				duration={transition ? duration : 0}
				className={bemElement(BLOCK, 'popup')}
				closeOnClickOverlay
				onEnter={onOpen}
				onLeave={onClose}
				onClose={onToggle}
				onAfterEnter={onOpened}
				onAfterLeave={handleClosed}
			>
				{
					Array.isArray(options)
					&&
					options.length > 0
					&&
					options.map((option) => {
						const actived = option.value === value

						return (
							<DropdownOption 
								key={option.value}
								className={bemElement(
									BLOCK,
									'option',
									{ actived }
								)}
								{...option}
								onClick={onTapOption}
							/>
						)
					})
				}

				{children}
			</Popup>
		</view>
	)
})

DropdownItem.propTypes = {
	index: PropTypes.number.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	title: PropTypes.string,
	disabled: PropTypes.bool,
	options: PropTypes.arrayOf(PropTypes.shape({
		text: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		icon: PropTypes.string
	})),
	overlay: PropTypes.bool.isRequired,
	activeColor: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	closeOnClickOverlay: PropTypes.bool.isRequired,
	direction: PropTypes.string.isRequired,
	onGetWrapperStyle: PropTypes.func.isRequired,
	onUpdateData: PropTypes.func.isRequired,
	onChange: PropTypes.func,
	onOpen: PropTypes.func,
	onClose: PropTypes.func,
	onOpened: PropTypes.func,
	onClosed: PropTypes.func
} 

DropdownItem.defaultProps = {
	options: []
}