import React, { 
	Children, 
	isValidElement, 
	useState, 
	useRef,
	createRef,
	useEffect,
	cloneElement
} from 'react'
import PropTypes from 'prop-types'
import Taro, { usePageScroll } from '@tarojs/taro'
import { isFragment } from "react-is"
import { useMemoizedFn, useDebounceFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import uniqueId from '../../utils/unique-id'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getElementRect, getElementRectsBySelector } from '../../utils/element'
import IndexBarSidebar from './index-bar-sidebar'
import IndexAnchor from '../index-anchor'

export const BLOCK = 'index-bar'

const getIndexList = () => {
  const indexList = []
  const charCodeOfA = 'A'.charCodeAt(0)

  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i))
  }

  return indexList
}

const getClonedChildren = (
	children, 
	cloned, 
	stickyOffsetTop, 
	scrollDuration,
	activeAnchorIndex,
) => {
	Children.forEach(children, (child) => {
		if (!isValidElement(child)) {
			return 
		}

		const childType = child.type
    const { key, props } = child
    const childrenProp = props.children

		if (isFragment(child)) {
      getClonedChildren(
				childrenProp, 
				cloned, 
				stickyOffsetTop, 
				scrollDuration,
				activeAnchorIndex
			)

      return
    }

		if (childType === IndexAnchor) {
			const { index: indexProp } = props
      const anchorRef = createRef()

      cloned.anchorRefs.push({ref: anchorRef, index: indexProp})

      cloned.children?.push(
        cloneElement(child, {
          key: indexProp,
          ref: anchorRef,
					stickyOffsetTop,
					scrollDuration,
					activeIndex: activeAnchorIndex
        })
      )
		}else {
      cloned.children?.push(
        cloneElement(child, {
          key: key ?? uniqueId('index-bar-child-key')
        }),
      )
    }
	})
}

const getChildren = (
	children, 
	stickyOffsetTop, 
	scrollDuration,
	activeAnchorIndex
) => {
	const result = {
		children: [],
		anchorRefs: []
	}

	getClonedChildren(
		children, 
		result, 
		stickyOffsetTop, 
		scrollDuration,
		activeAnchorIndex
	)

	return result
}

export const IndexBar = props => {
	const { 
		zIndex, 
		sticky, 
		highlightColor, 
		indexList,
		stickyOffsetTop,
		scrollDuration,
		children,
		onSelect 
	} = props

	const scrollTopRef = useRef(0)
	const scrollToAnchorIndexRef = useRef(null)
	const listRef = useRef()
	const anchorRectsRef = useRef([])

	const [activeAnchorIndex, setActiveAnchorIndex] = useState(null)
	const [showSideBar, setShowSideBar] = useState(true)
	const [clonedChildren, setClonedChildren] = useState([])
	const [anchorRefs, setAnchorRefs] = useState([])

	const getAnchorRects = () => {
		return getElementRectsBySelector(listRef, `.${bemBlock('index-anchor')}`)
	}

	const getActiveAnchor = () => {
    const { current: anchorRects } = anchorRectsRef

    for (let i = anchorRefs.length - 1; i >= 0; i--) {
      if (0 >= anchorRects[i].top) {
        return i
      }
    }
    return -1
  }

	const scrollToAnchor = async (index) => {
		if (typeof index !== 'number' || scrollToAnchorIndexRef.current === index) {
			return
		}

		scrollToAnchorIndexRef.current = index	

		const anchorRefItem = anchorRefs.find((refItem) => {
			return refItem.index === indexList[index]
		})

		if (anchorRefItem) {
			await anchorRefItem.ref.current.scrollIntoView(scrollTopRef.current)

			onSelect?.(indexList[index])
		}
	}

	const onClickSideBarIndex = useMemoizedFn((event) => {
		event.stopPropagation()

		scrollToAnchor(event.currentTarget.dataset.index)
	})

	const { run: onPageScroll } = useDebounceFn(async () => {
		try {
			const anchorRects = await getAnchorRects()

			anchorRectsRef.current = anchorRects

			if (!anchorRefs.length) {
				return
			}

			const activedAnchorArrIndex = getActiveAnchor()

			if (activedAnchorArrIndex >= 0) {
				setActiveAnchorIndex(anchorRefs[activedAnchorArrIndex].index)
			} else {
				setActiveAnchorIndex(null)
			}
		}catch (err) {
			Taro.showToast({
				title: err.message || err,
				icon: 'none',
				duration: 2000
			})
		}
	}, { wait: 80 })

	useEffect(() => {
		const result = getChildren(
			children, 
			stickyOffsetTop,
			scrollDuration,
			activeAnchorIndex
		)

		setClonedChildren(result.children)
		setAnchorRefs(result.anchorRefs)
	}, [
		children, 
		stickyOffsetTop,
		scrollDuration,
		activeAnchorIndex
	])

	usePageScroll(({ scrollTop }) => {
		scrollTopRef.current = scrollTop

		onPageScroll()
	})

	const barStyle = highlightColor && {'--index-highlight-color': highlightColor}

	return withNativeProps(
		props,
		<view ref={listRef} className={bemBlock(BLOCK)} style={barStyle}>
			{clonedChildren}

			{
				showSideBar
				&&
				<IndexBarSidebar 
					zIndex={zIndex} 
					activeAnchorIndex={activeAnchorIndex}
					list={indexList}
					onClickIndex={onClickSideBarIndex}
				/>
			}

			{
				sticky
				&&
				activeAnchorIndex
				&&
				<IndexAnchor 
					className={bemElement(BLOCK, 'sticky')}
					style={{top: `${stickyOffsetTop}px`}}
				>{activeAnchorIndex}</IndexAnchor>
			}
		</view>	
	)
}

IndexBar.propTypes = {
	sticky: PropTypes.bool,
	highlightColor: PropTypes.string,
	stickyOffsetTop: PropTypes.number,
	scrollDuration: PropTypes.number,
	indexList: PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
	onSelect: PropTypes.func
}

IndexBar.defaultProps = {
	stickyOffsetTop: 0,
	scrollDuration: 100,
	sticky: true,
	indexList: getIndexList()
}