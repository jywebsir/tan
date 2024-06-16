import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import { useReady } from '@tarojs/taro'
import { requestAnimationFrame } from '../../utils/helpers'
import { isObj, isFunction } from '../../utils/validator'

const getClassNames = (
	name, 
	{
		enterClass,
		enterToClass,
		enterActiveClass,
		leaveClass,
		leaveToClass,
		leaveActiveClass
	}
) => {
	const result = {
		enter: classNames(
			name && `tan-${name}-enter tan-${name}-enter-active`,	
			enterClass,
			enterActiveClass
		),
		enterTo: classNames(
			name && `tan-${name}-enter-to tan-${name}-enter-active`,
			enterToClass,
			enterActiveClass
		),
		leave: classNames(
			name && `tan-${name}-leave tan-${name}-leave-active`,
			leaveClass,
			leaveActiveClass
		),
		leaveTo: classNames(
			name && `tan-${name}-leave-to tan-${name}-leave-active`,
			leaveToClass,
			leaveActiveClass
		)
	}

	return result
} 

const STATUS_ENTER = 'enter'
const STATUS_ENTER_TO = 'enterTo'
const STATUS_LEAVE = 'leave'
const STATUS_LEAVE_TO = 'leaveTo'

const useTransition = (props) => {
	const statusRef = useRef(null)
	const transitionEndRef = useRef(false)

	const { 
		show, 
		name,
		duration, 
		enterClass,
		enterToClass,
		enterActiveClass,
		leaveClass,
		leaveActiveClass,	
		leaveToClass,
		onBeforeEnter,
		onAfterEnter,
		onEnter,
		onBeforeLeave,
		onAfterLeave,
		onLeave
	} = props

	const [inited, setInited] = useState(false)
	const [display, setDisplay] = useState(false)
	const [currentDuration, setCurrentDuration] = useState(null)
	const [statusClsKey, setStatusClsKey] = useState(null)

	const onTransitionEnd = useMemoizedFn(() => {
		if (transitionEndRef.current) {
			return
		}

		transitionEndRef.current = true

		if (statusRef.current === STATUS_ENTER && isFunction(onAfterEnter)) {
			onAfterEnter()
		}else if (statusRef.current === STATUS_LEAVE && isFunction(onAfterLeave)) {
			onAfterLeave()
		}

		if (!show && display) {
			setDisplay(false)
		}
	})

	const handleEnter = useMemoizedFn(() => {
		const curDuration = isObj(duration) ? duration.enter : duration

		statusRef.current = STATUS_ENTER

		if (isFunction(onBeforeEnter)) {
			onBeforeEnter()
		}

		requestAnimationFrame(() => {
			if (statusRef.current !== STATUS_ENTER) {
				return
			}

			if (isFunction(onEnter)) {
				onEnter()
			}

			setInited(true)
			setDisplay(true)
			setStatusClsKey(STATUS_ENTER)
			setCurrentDuration(curDuration)

			requestAnimationFrame(() => {
				if (statusRef.current !== STATUS_ENTER) {
					return
				}

				transitionEndRef.current = false

				setStatusClsKey(STATUS_ENTER_TO)
			})
		})	
	})

	const handleLeave = useMemoizedFn(() => {
		if (display === false) {
			return
		}

		const curDuration = isObj(duration) ? duration.leave : duration

		statusRef.current = STATUS_LEAVE

		if (isFunction(onBeforeLeave)) {
			onBeforeLeave()
		}

		requestAnimationFrame(() => {
			if (statusRef.current !== STATUS_LEAVE) {
				return 
			}

			if (isFunction(onLeave)) {
				onLeave()
			}

			setStatusClsKey(STATUS_LEAVE)
			setCurrentDuration(curDuration)

			requestAnimationFrame(() => {
				if (statusRef.current !== STATUS_LEAVE) {
					return 
				}

				transitionEndRef.current = false
				setTimeout(() => {
					onTransitionEnd()
				}, curDuration)

				setStatusClsKey(STATUS_LEAVE_TO)
			})
		})		
	})

	useEffect(() => {
		if (show) {
			handleEnter()
		}else {
			handleLeave()
		}
	}, [show])

	const clsNames = getClassNames(name, {
		enterClass,
		enterToClass,
		enterActiveClass,
		leaveClass,
		leaveToClass,
		leaveActiveClass
	})

	return {
		inited,
		display,
		clsNames,
		currentDuration,
		statusClsKey,
		onTransitionEnd
	}
}

export default useTransition 