import React, { 
	isValidElement, 
	Children,
	createRef,
	useState, 
	useRef,
	useEffect,
	useMemo
} from 'react'
import PropTypes from 'prop-types'
import Taro, { usePageScroll } from '@tarojs/taro'
import { useMemoizedFn, useDebounceFn, useThrottleFn, useMount } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import uniqueId from '../../utils/unique-id'
import { getElementRect, getElementRectsBySelector } from '../../utils/element'
import { bemBlock, bemElement } from '../../utils/class-name'
import traverseReactNode from '../../utils/traverse-react-node'
import IndexBarSidebar from './index-bar-sidebar'
import IndexBarAnchor from './index-bar-anchor'
import IndexBarGroup from './index-bar-group'

export const BLOCK = 'index-bar'

export const IndexBar = props => {
	const { 
		zIndex, 
		sticky, 
		highlightColor, 
		indexList,
		stickyOffsetTop,
		scrollDuration,
		safeAreaBottom,
		children,
		onSelect 
	} = props

	const scrollTopRef = useRef(0)
	const listRef = useRef()
	const anchorRectsRef = useRef([])

	const [activeIndex, setActiveIndex] = useState(null)
	const [lockingActiveIndexCheck, setLockingActiveIndexCheck] = useState(false)

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
			if (!React.isValidElement(child)) return

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

	useMount(() => {
		if (indexGroupList.indexes.length > 0) {
			setActiveIndex(indexGroupList.indexes[0].index)
		}	
	})

	usePageScroll(({ scrollTop }) => {
		scrollTopRef.current = scrollTop

		if (!lockingActiveIndexCheck) {
			checkActiveIndex()
		}
	})

	return withNativeProps(
		props,
		<view 
			ref={listRef} 
			className={bemBlock(BLOCK, [safeAreaBottom && 'safe-area-bottom'])} 
		>
			{
				Children.map(children, (child) => {
					const refAnchor = indexGroupList.anchorRefs[child.props.index]

					return (
						<IndexBarAnchor 
							key={child.props.index}
							ref={refAnchor}
							activeIndex={activeIndex}
							index={child.props.index}
							title={child.props.title}
							sticky={sticky}
							stickyOffsetTop={stickyOffsetTop}
							scrollDuration={scrollDuration}
							scrollTop={scrollTopRef.current}
							onInitRect={onInitAnchorRect}
						>
							{child.props.children}
						</IndexBarAnchor>	
					)
				}) 
			}

			<IndexBarSidebar 
				zIndex={zIndex} 
				activeIndex={activeIndex}
				list={indexGroupList.indexes}
				onClickIndex={onClickSideBarIndex}
			/>
		</view>	
	)
}

IndexBar.propTypes = {
	sticky: PropTypes.bool,
	stickyOffsetTop: PropTypes.number,
	scrollDuration: PropTypes.number,
	safeAreaBottom: PropTypes.bool,
	onSelect: PropTypes.func
}

IndexBar.defaultProps = {
	stickyOffsetTop: 0,
	scrollDuration: 100,
	sticky: true,
	safeAreaBottom: true
}