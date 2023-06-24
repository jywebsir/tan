import React, { 
	isValidElement, 
	Children,
	createRef,
	useState, 
	useRef,
	useMemo
} from 'react'

import Taro, { usePageScroll } from '@tarojs/taro'

import { 
	useMemoizedFn, 
	useDebounceFn, 
	useThrottleFn, 
	useMount 
} from 'ahooks'

import traverseReactNode from '../../utils/traverse-react-node'

import IndexBarGroup from './index-bar-group'

const useIndexBar = ({
	children,
	scrollDuration,
	sticky,
	stickyOffsetTop,
	showBackOffsetTop,
	lazyRender,
	lazyRenderOffsetTop,
	initActiveGroupIndexes,
	onSelect
}) => {
	const scrollTopRef = useRef(0)
	const anchorRectsRef = useRef([])

	const [showBackTop, setShowBackTop] = useState(false)
	const [activeIndex, setActiveIndex] = useState(null)
	const [lockingActiveIndexCheck, setLockingActiveIndexCheck] = useState(false)
	const [activeGroupIndexes, setActiveGroupIndexes] = useState([])

	const onInitAnchorRect = useMemoizedFn((rect) => {
		const finded = anchorRectsRef.current.find((item) => {
			return item.index === rect.index
		})

		if (finded !== -1) {
			anchorRectsRef.current.push(rect)
		}
	})

	const indexGroupList = useMemo(() => {
		const indexes = []
		const anchorRefs = {} 

		traverseReactNode(children, child => {
			if (!isValidElement(child)) return

			if (child.type !== IndexBarGroup) {
				return
			}

			indexes.push({
				index: child.props.index,
				brief: child.props.brief ?? child.props.index.charAt(0),
			})

			const refAnchor = createRef()
			anchorRefs[child.props.index] = refAnchor
		})

		return {
			indexes,
			anchorRefs
		}
	}, [children])

	const scrollToAnchor = (index) => {
		const anchorRef = indexGroupList.anchorRefs[index]

		anchorRef?.current.scrollIntoView(scrollTopRef.current)
	}

	const onClickSideBarIndex = useMemoizedFn((event) => {
		const { index } = event.currentTarget.dataset

		if (index === activeIndex) {
			return
		}

		setLockingActiveIndexCheck(true)
		setActiveIndex(index)
		scrollToAnchor(index)

		onSelect?.(index)		

		setTimeout(() => {
			setLockingActiveIndexCheck(false)
		}, scrollDuration + 100)
	})

	const getActiveIndex = () => {
		const reachTop = sticky ? anchorRectsRef.current[0].height + stickyOffsetTop : 0	

		const activeAnchors = anchorRectsRef.current.filter((anchorRect) => {
			return scrollTopRef.current + reachTop >= anchorRect.top
		})

		if (activeAnchors.length > 0) {
			return activeAnchors[activeAnchors.length - 1].index
		}

		return null
	}

	const { run: checkActiveIndex } = useThrottleFn(() => {
		try {
			const index = getActiveIndex()

			if (index === null || index === activeIndex) {
				return
			}

			setActiveIndex(index)
		}catch (err) {
			Taro.showToast({
				title: err.message || err,
				icon: 'none',
				duration: 2000
			})	
		}
	}, {
		wait: 50, trailing: true, leading: true 
	})

	const { run: updateBackTopStatus } = useThrottleFn(() => {
		if (scrollTopRef.current > showBackOffsetTop) {
			setShowBackTop(true)	
		}else {
			setShowBackTop(false)
		}
	}, {
		wait: 150, trailing: true 
	})

	const { run: checkActiveGroups } = useThrottleFn(() => {
		const activedGroups = anchorRectsRef.current.filter((item) => {
			return scrollTopRef.current > item.top - lazyRenderOffsetTop
		})

		if (Array.isArray(activedGroups) && activedGroups.length > 0) {
			const notInActivedGroups = activedGroups.filter((item) => {
				return !activeGroupIndexes.includes(item.index)
			})

			const shouldActivedGroupIndexes = notInActivedGroups.map((item) => {
				return item.index
			})

			if (Array.isArray(shouldActivedGroupIndexes) && shouldActivedGroupIndexes.length > 0) {
				setActiveGroupIndexes((preIndexes) => {
					return [
						...preIndexes,
						...shouldActivedGroupIndexes
					]
				})
			}
		}	
	}, {
		wait: 50, trailing: true, leading: true 	
	})

	useMount(() => {
		if (indexGroupList.indexes.length > 0) {
			const firstIndex = indexGroupList.indexes[0].index

			setActiveIndex(firstIndex)

			if (lazyRender) {
				if (
					Array.isArray(initActiveGroupIndexes) 
					&& 
					initActiveGroupIndexes.length > 0
				) {
					setActiveGroupIndexes([...initActiveGroupIndexes])	
				}else {
					setActiveGroupIndexes([firstIndex])	
				}
			}
		}	
	})

	usePageScroll(({ scrollTop }) => {
		scrollTopRef.current = scrollTop

		updateBackTopStatus()

		if (!lockingActiveIndexCheck) {
			checkActiveIndex()
		}

		if (lazyRender) {
			checkActiveGroups()
		}
	})

	return {
		activeIndex,
		activeGroupIndexes,
		scrollTop: scrollTopRef.current,
		anchorRefs: indexGroupList.anchorRefs,
		indexes: indexGroupList.indexes,
		showBackTop,
		onInitAnchorRect,
		onClickSideBarIndex
	}
}

export default useIndexBar