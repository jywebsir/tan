import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isFunction } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import useTransition from '../transition/use-transition'
import Overlay from '../overlay'
import Icon from '../icon'

const BLOCK = 'popup'

export const Popup = props => {
	const { 
		show,
		zIndex,
		duration,
		lockScroll,
		closeable,
		closeIcon,
		closeIconPosition,	
		position,
		transition,
		round,
		overlay,
		closeOnClickOverlay,
		safeAreaInsetBottom,
		safeAreaInsetTop,
		children,
		onClickOverlay,
		onClose
	} = props

	const {
		inited, 
		display,
		clsNames,
		currentDuration, 
		statusClsKey,
		onTransitionEnd
	} = useTransition({...props, name: transition || position})

	const handleClickCloseIcon = useMemoizedFn(() => {
		if (isFunction(onClose)) {
			onClose()
		}
	})

	const handleClickOverlay = useMemoizedFn(() => {
		if (isFunction(onClickOverlay)) {
			onClickOverlay()
		}	

		if (closeOnClickOverlay) {
			handleClickCloseIcon()
		}
	})

	const blockClsNames = classNames(
		bemBlock(
			BLOCK, 
			[
				position, 
				{
					round, 
					safe: safeAreaInsetBottom, 
					safeTop: safeAreaInsetTop,
					hide: !display
				}
			]
		),
		clsNames[statusClsKey]
	)

	const inlineStyle = {
		transitionDuration: `${currentDuration}ms`,
		zIndex
	}

	return (
		<>
			{
				overlay
				&&
				<Overlay 
					show={show}
					zIndex={zIndex}
					lockScroll={lockScroll}
					onClick={handleClickOverlay}
				/>	
			}

			{
				inited
				&&
				withNativeProps(
					props,
					<view 
					className={blockClsNames} 
					style={inlineStyle}
					onTransitionEnd={onTransitionEnd}
				>
					{children}

					{
						closeable	
						&&
						<Icon 
							name={closeIcon} 
							className={bemElement(BLOCK, 'close-icon', [closeIconPosition])}
							onClick={handleClickCloseIcon}
						/>
					}
				</view>
				)
			}
		</>
	)
}

Popup.propTypes = {
	show: PropTypes.bool,
	duration: PropTypes.number,
	round: PropTypes.bool,
	zIndex: PropTypes.number,
	overlay: PropTypes.bool,
	closeable: PropTypes.bool,
	closeIcon: PropTypes.string,
	closeIconPosition: PropTypes.string,
	closeOnClickOverlay: PropTypes.bool,
	position: PropTypes.string,
	transition: PropTypes.string,
	safeAreaInsetBottom: PropTypes.bool,
	safeAreaInsetTop: PropTypes.bool,
	lockScroll: PropTypes.bool,
	enterClass: PropTypes.string,
	enterActiveClass: PropTypes.string,
	enterToClass: PropTypes.string,
	leaveClass: PropTypes.string,
	leaveActiveClass: PropTypes.string,
	leaveToClass: PropTypes.string,
	onBeforeEnter: PropTypes.func,
	onEnter: PropTypes.func,
	onAfterEnter: PropTypes.func,
	onBeforeLeave: PropTypes.func,
	onLeave: PropTypes.func,
	onAfterLeave: PropTypes.func,
	onClose: PropTypes.func,
	onClickOverlay: PropTypes.func
}

Popup.defaultProps = {
	show: false,
	lockScroll: true,
	duration: 300,
	zIndex: 100,
	overlay: true,
	closeable: false,
	closeIcon: 'cross',
	closeIconPosition: 'top-right',
	closeOnClickOverlay: true,
	position: 'center',
	safeAreaInsetBottom: true,
	safeAreaInsetTop: false
}
