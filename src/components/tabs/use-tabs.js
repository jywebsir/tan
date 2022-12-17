import React, { useRef } from 'react'
import { useMemoizedFn, useSafeState, useUpdateEffect, useMount } from 'ahooks'
import usePropsValue from '../../hooks/use-props-value'
import { isDef } from '../../utils/validator'
import { TYPE_LINE } from './tabs'

const useTabs = props => {
	const {
		type,
		lazyRender,
		ellipsis,
		animated,
		swipeThreshold,
		children
	} = props

	const stickyContainer = useRef()

	const [value, setValue] = usePropsValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: v => {
      props.onChange?.(v)
    }
  })

	const childArr = React.Children.toArray(children)

	const getCurrentIndexByValue = (val) => {
		const findedIndex = childArr.findIndex((item, index) => {
			if (isDef(item.props.value) && item.props.value === val)  {
				return true
			}

			if (val === index) {
				return true
			}

			return false
		})

		if (findedIndex !== -1) {
			return findedIndex
		}

		return 0
	}

	const getTabs = () => {
		return childArr.map((tab, index) => {
			return {
				index,
				...tab.props
			}
		})
	}

	const getScrollable = () => {
		return children.length > swipeThreshold || !ellipsis
	}

	const [currentIndex, setCurrentIndex] = useSafeState(() => {
		if (isDef(value)) {
			return getCurrentIndexByValue(value)
		}

		return 0
	})

	const [tabs, setTabs] = useSafeState(getTabs)
	const [scrollable, setScrollable] = useSafeState(getScrollable)

	const isLineType = type === TYPE_LINE

	const contextValue = {
		value,
		currentIndex,
		lazyRender,
		animated
	}

	const onChangeValue = useMemoizedFn(v => {
		setValue(v)
	})

	useUpdateEffect(() => {
		setScrollable(getScrollable())
	}, [children])

	return {
		currentIndex,
		contextValue,
		tabs,
		isLineType,
		scrollable,
		onChangeValue
	}
}

export default useTabs