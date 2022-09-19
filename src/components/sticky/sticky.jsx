import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { usePageScroll, useReady } from '@tarojs/taro'
import { useMount, useDebounceFn, useUpdateEffect } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getRect } from '../../utils/helpers'
import { isDef, isFunction } from '../../utils/validator'

const BLOCK = 'sticky'

export const Sticky = props => {
	const { 
		zIndex, 
		offsetTop, 
		disabled, 
		handleScrollWait, 
		container, 
		onScroll 
	} = props

	const containerRef = useRef()
	const scrollTopRef = useRef(null)

	const [containerId, setContainerId] = useState(null)
	const [height, setHeight] = useState(0)
	const [fixed, setFixed] = useState(false)	
	const [transform, setTransform] = useState(0)

	const getContainerRect = () => {
		return new Promise((resolve) => container().boundingClientRect(resolve).exec())
	}

	const handleScroll = ({ scrollTop } = {}) => {
		if (disabled) {
			setFixed(false)
			setTransform(0)

			return
		}

		if (scrollTop) {
			scrollTopRef.current = scrollTop
		}

		if (isFunction(container)) {
			Promise.all([
				getRect(`#${containerRef.current.id}`),
				getContainerRect()
			]).then(([rootRect, containerRect]) => {
				let isFixed = false
				let fixedHeight = null
				let transformVal = null

				if (offsetTop + rootRect.height > containerRect.height + containerRect.top) {
					isFixed = false
					transformVal = containerRect.height - rootRect.height
				}else if (offsetTop >= rootRect.top) {
					isFixed = true
					fixedHeight = rootRect.height
					transformVal = 0
				}else {
					isFixed = false
					transformVal = 0
				}

				wx.nextTick(() => {
					setFixed(isFixed)
					setTransform(transformVal)

					if (fixedHeight) {
						setHeight(fixedHeight)
					}
				})	
			})
		}else {
			getRect(`#${containerRef.current.id}`).then((rect) => {
				if (!isDef(rect)) return

				let isFixed = false
				let fixedHeight = null

				if (offsetTop >= rect.top) {
					isFixed = true
					fixedHeight = rect.height
				}

				wx.nextTick(() => {
					setFixed(isFixed)

					if (fixedHeight) {
						setHeight(fixedHeight)
					}

					if (isFunction(onScroll)) {
						onScroll({
							scrollTop: scrollTopRef.current,
							isFixed
						})
					}	
				})	
			})
		}
	}

	const { run: onPageScroll } = useDebounceFn(
    (event) => {
			if (!!props.scrollTop) return
	
			handleScroll(event)
		},
    {
      wait: handleScrollWait
    }
  )

	usePageScroll(onPageScroll)

	useUpdateEffect(() => {
		handleScroll()	
	}, [offsetTop])

	useUpdateEffect(() => {
		handleScroll({
			scrollTop: props.scrollTop
		})	
	}, [props.scrollTop])

	useUpdateEffect(() => {
		handleScroll()
	}, [container])

	useMount(() => {
		setContainerId(containerRef.current.uid)	
	})

	useReady(() => {
		wx.nextTick(() => {
			handleScroll()
		})
	})

	const containerStyle = {zIndex}

	if (fixed) {
		containerStyle.height = `${height}px`
	}

	const wrapStyle = {zIndex}

	if (transform) {
		wrapStyle.transform = `translate3d(0,${transform}px, 0)`
	}

	if (fixed) {
		wrapStyle.top = `${offsetTop}px`
	}

	return withNativeProps(
		props,
		<view 
			id={containerId}
			ref={containerRef}
			className={bemBlock(BLOCK)} 
			style={containerStyle}
		>
			<view 
				className={bemElement(BLOCK, 'wrap', {fixed})}
				style={wrapStyle}
			>{props.children}</view>
		</view>
	)	
}

Sticky.propTypes = {
	zIndex: PropTypes.number,
	offsetTop: PropTypes.number,
	disabled: PropTypes.bool,
	container: PropTypes.func,
	scrollTop: PropTypes.number,
	handleScrollWait: PropTypes.number,
	onScroll: PropTypes.func
} 

Sticky.defaultProps = {
	zIndex: 99,
	offsetTop: 0,
	disabled: false,
	handleScrollWait: 30
}