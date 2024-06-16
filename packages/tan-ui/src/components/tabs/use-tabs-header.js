import { useRef } from 'react'
import { useSafeState, useUpdateEffect, useMount } from 'ahooks'
import { getElementRectsBySelector } from '../../utils/element'
import { requestAnimationFrame } from '../../utils/helpers'
import { nextTick } from '@tarojs/taro'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './tabs'

const useTabsHeader = props => {
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
			getElementRectsBySelector(headerRef, `.${bemElement(BLOCK, 'line')}`)
		]).then(([rects = [], lineRects = []]) => {
			const rect = rects[currentIndex]
			const lineRect = lineRects[0]

			if (!rect || !lineRect) {
				return
			}

			let lineOffsetLeft = rects.slice(
				0, currentIndex
			).reduce(
				(prev, curr) => prev + curr.width, 0
			)

			lineOffsetLeft += (rect.width - lineRect.width) / 2 

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
			getElementRectsBySelector(headerRef, `.${bemElement(BLOCK, 'nav')}`)
		]).then(([
			tabRects, navRects
		]) => {
			const tabRect = tabRects[currentIndex];
			const navRect = navRects[0]

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

	const onChangeIndex = () => {
		requestAnimationFrame(() => {
			swipingRef.current = true

			handleResize()
			scrollIntoView()
		})	
	}

	useMount(() => {
		onChangeIndex()
	})

	useUpdateEffect(() => {
		onChangeIndex()
	}, [currentIndex])

	return {
		headerRef,
		skipTransition,
		scrollWithAnimation,
		scrollLeft,
		lineOffsetLeft
	}
}

export default useTabsHeader