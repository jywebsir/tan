import React, { isValidElement, useMemo, useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { useMemoizedFn, useUpdateEffect, useMount } from 'ahooks'
import usePropsValue from '../../hooks/use-props-value'
import useTouch from '../../utils/use-touch'
import traverseReactNode from '../../utils/traverse-react-node'
import { isDef, isFunction } from '../../utils/validator'
import { TYPE_LINE } from './tabs'
import Tab from './tab'

const useTabs = props => {
	const {
		type,
		lazyRender,
		ellipsis,
		animated,
		swipeThreshold,
		swipeable,
		sticky,
		children,
		onBeforeChange
	} = props

	const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      props.onChange?.(v)
    }
  })

	const tabs = useMemo(() => {
		const result = []

		traverseReactNode(children, (child, index) => {
			if (!isValidElement(child)) return

			if (child.type !== Tab) {
				return
			}

			const {
				value: val,
				...extraProps
			} = child.props

			result.push({
				value: val ?? index,
				...extraProps
			})	
		})

		return result
	}, [children])

	const ref = useRef()
	const touch = useTouch()

	const [scrollable, setScrollable] = useState(getScrollable)
	const [swiping, setSwiping] = useState(false)
	const [stickyContainer, setStickContainer] = useState(null)

	const isLineType = type === TYPE_LINE

	const currentIndex = useMemo(() => {
		return getCurrentIndexByValue(value)
	}, [value, tabs])

	const onClickTab = useMemoizedFn((event) => {
		const { value: val } = event.currentTarget.dataset

		if (val === value) {
			return
		}

		if (isFunction(onBeforeChange)) {
			const tab = getTabByVal(val)

			onBeforeChange({
				value: tab.value,
				title: tab.title
			}).then(() => {
				setValue(val)
			})
		}else {
			setValue(val)
		}
	})
	
	const onTouchStart = useMemoizedFn((event) => {
		if (!swipeable) return	

		setSwiping(true)

		touch.start(event)
	})

	const onTouchMove = useMemoizedFn((event) => {
		if (!swipeable || !swiping) return

		touch.move(event)
	})

	const onTouchEnd = useMemoizedFn((event) => {
		if (!swipeable || !swiping) return

		const { deltaX, offsetX } = touch
		const minSwipeDistance = 50

		if (touch.isHorizontal() && offsetX >= minSwipeDistance) {
			const val = getCurrentValueByDeltaX(deltaX)

			if (val !== -1) {
				setValue(val)
			}
		}

		setSwiping(false)
	}) 

	function getScrollable() {
		return children.length > swipeThreshold || !ellipsis
	}	

	function getCurrentIndexByValue(val) {
		const findedIndex = tabs.findIndex((item) => {
			if (isDef(item.value) && item.value === val)  {
				return true
			}

			return false
		})

		if (findedIndex !== -1) {
			return findedIndex
		}

		return 0
	}

	function getCurrentValueByDeltaX(deltaX) {
		const step = deltaX > 0 ? -1 : 1

		const nextIndex = getIndexByDeltaX(deltaX)

		if (nextIndex !== -1) {
			return tabs[nextIndex].value
		}

		return null
	}

	function getIndexByDeltaX(deltaX) {
		const step = deltaX > 0 ? -1 : 1;

		for (
			let i = step;
			currentIndex + i < tabs.length && currentIndex + i >= 0;
			i += step
		) {
			const index = currentIndex + i

			if (
				index >= 0 &&
				index < tabs.length &&
				tabs[index] &&
				!tabs[index].disabled
			) {
				return index;
			}
		}

		return -1;
	}

	function getTabByVal(val) {
		const tab = tabs.find((item) => {
			return item.value === val
		})

		return tab
	}

	function initStickyContainer() {
		const tabsNode = Taro.createSelectorQuery().select(`#${ref.current.uid}`)

		setStickContainer(tabsNode)
	}
	
	useMount(() => {
		if (sticky) {
			initStickyContainer()
		}
	})
	
	useUpdateEffect(() => {
		setScrollable(getScrollable())
	}, [children])

	return {
		ref,
		value,
		currentIndex,
		tabs,
		isLineType,
		scrollable,
		stickyContainer,
		onClickTab,
		onTouchStart,
		onTouchMove,
		onTouchEnd
	}
}

export default useTabs