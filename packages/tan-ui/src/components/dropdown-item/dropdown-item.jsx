import React, { forwardRef, useState, useEffect, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { nextTick } from '@tarojs/taro'
import { useMemoizedFn, useLockFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Popup from '../popup'
import Cell from '../cell'
import DropdownTrigger from './dropdown-trigger'
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
		getWrapperStyle,
		handleCloseItems,
		onChange,
		onOpen,
		onOpened,
		onClose,
		onClosed
	} = props

	const [transition, setTransition] = useState(true)
	const [showPopup, setShowPopup] = useState(false)
	const [wrapperStyle, setWrapperStyle] = useState(null)

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

	const onClickTrigger = useMemoizedFn(() => {
		if (disabled) {
			return
		}	

		handleCloseItems(index)

		nextTick(onToggle)
	})

	useImperativeHandle(ref, () => ({
		toggle: onToggle	
  }))

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			<DropdownTrigger 
				title={title}
				value={value}
				direction={direction}
				options={options}
				showPopup={showPopup}
				disabled={disabled}
				className={bemElement(BLOCK, 'trigger')} 
				onClick={onClickTrigger}
			/>

			<view 
				className={
					bemElement(
						BLOCK, 
						'options', 
						[direction, {hide: !showPopup}]
					)
				}  
				style={wrapperStyle}
			>
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