import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { bemBlock } from '../../utils/class-name'
import { withNativeProps } from '../../utils/native-props'
import useTransition from './use-transition'

const BLOCK = 'transition'

export const Transition = props => {
	const { 
		lockScroll,
		children,
		onClick
	} = props

	const {
		inited, 
		display,
		clsNames,
		currentDuration, 
		statusClsKey,
		onTransitionEnd
	} = useTransition(props)

	if (!inited) {
		return null
	}

	const inlineStyle = {transitionDuration: `${currentDuration}ms`}

	return withNativeProps(
		props,
		<view 
			className={classNames(
				bemBlock(BLOCK, [{'hide': !display}]), 
				clsNames[statusClsKey]
			)}
			style={inlineStyle}
			catchMove={lockScroll}
			onTransitionEnd={onTransitionEnd}
			onTap={onClick}
		>
			{children}
		</view>
	)
}

Transition.propTypes = {
	show: PropTypes.bool,
	duration: PropTypes.number,
	name: PropTypes.string,
	enterClass: PropTypes.string,
	enterActiveClass: PropTypes.string,
	enterToClass: PropTypes.string,
	leaveClass: PropTypes.string,
	leaveActiveClass: PropTypes.string,
	leaveToClass: PropTypes.string,
	lockScroll: PropTypes.bool,
	onBeforeEnter: PropTypes.func,
	onEnter: PropTypes.func,
	onAfterEnter: PropTypes.func,
	onBeforeLeave: PropTypes.func,
	onLeave: PropTypes.func,
	onAfterLeave: PropTypes.func,
	onClick: PropTypes.func
} 

Transition.defaultProps = {
	show: false,
	lockScroll: false,
	duration: 300,
	name: 'fade'
}