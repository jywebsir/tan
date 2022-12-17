import { useRef } from 'react'
import { useSafeState, useUpdateEffect, useMount } from 'ahooks'
import { getElementRect, getElementRectsBySelector } from '../../utils/element'
import { requestAnimationFrame } from '../../utils/helpers'
import { nextTick } from '@tarojs/taro'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './tabs'

const useTabHeader = props => {
	const { 
		currentIndex,
		scrollable,
		ellipsis,
		isLineType
	} = props

	const swipingRef = useRef(false)
	const headerRef = useRef()

	const [scrollLeft, setScrollLeft] = useSafeState(0)
	const [skipTransition, setSkipTransition] = useSafeState(true)
	const [scrollWithAnimation, setScrollWithAnimation] = useSafeState(false)
	const [lineOffsetLeft, setLineOffsetLeft] = useSafeState(0)

	const tabClass = `.${bemElement(BLOCK, 'tab')}`

	const handleResize = () => {
		if (!isLineType) {
			return
		}

		Promise.all([
			getElementRectsBySelector(headerRef, tabClass),
			getElementRect(headerRef, `.${bemElement(BLOCK, 'line')}`)
		]).then(([rects = [], lineRect]) => {
			const rect = rects[currentIndex]

			if (rect === null) {
				return
			}

			let lineOffsetLeft = rects.slice(
				0, currentIndex
			).reduce(
				(prev, curr) => prev + curr.width, 0
			)
			
			lineOffsetLeft += (rect.width - lineRect.width) / 2 + (ellipsis ? 0 : 8)

			setLineOffsetLeft(lineOffsetLeft)

			swipingRef.current = true

			if (skipTransition) {
				nextTick(() => {
					setSkipTransition(false)
				})	
			}
		})
	}

	const scrollIntoView = () => {
		if (!scrollable) {
			return
		}

		Promise.all([
			getElementRectsBySelector(headerRef, tabClass),
			getElementRect(headerRef, `.${bemElement(BLOCK, 'nav')}`)
		]).then(([
			tabRects, navRect
		]) => {
			const tabRect = tabRects[currentIndex];
			const offsetLeft = tabRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width, 0)

			setScrollLeft(offsetLeft - (navRect.width - tabRect.width) / 2)

			if (!scrollWithAnimation) {
				nextTick(() => {
					setScrollWithAnimation(true)
				})
			}
		})
	}

	useMount(() => {
		requestAnimationFrame(() => {
			swipingRef.current = true

			handleResize()
			scrollIntoView()
		})
	})

	return {
		headerRef,
		scrollWithAnimation,
		scrollLeft,
		lineOffsetLeft
	}
}

export default useTabHeader