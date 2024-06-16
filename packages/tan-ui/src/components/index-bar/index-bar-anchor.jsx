import React, { useImperativeHandle, forwardRef, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMount } from 'ahooks'
import { pageScrollTo } from "@tarojs/taro"
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getRect } from '../../utils/element'
import { BLOCK } from './index-bar'

const IndexBarAnchor = forwardRef((props, ref) => {
	const { 
		activeIndex,
		index,
		title,
		sticky,
		stickyOffsetTop,
		scrollDuration,
		scrollTop,
		children,
		onInitRect
	} = props

	const anchorTitleId = useMemo(() => {
		return `anchor-title-${index}`
	}, [index])

	const anchorTitleRectRef = useRef()

	const actived = useMemo(() => {
		return activeIndex === index
	}, [
		activeIndex,
		index
	])

	const anchorStyle = useMemo(() => {
		if (actived && sticky) {
			return {
				top: `${stickyOffsetTop}px`
			}
		}

		return null
	}, [
		actived,
		stickyOffsetTop
	])

	const getAnchorTitleRect = async () => {
		let rect = null

		while (!rect) {
			rect = await getRect(`#${anchorTitleId}`)	
		}

		return rect
	}

	const initTitleRect = async () => {
		const { height, top } = await getAnchorTitleRect()

		anchorTitleRectRef.current = {
			height,
			top
		}

		onInitRect({
			index,
			height,
			top
		})
	}

	useImperativeHandle(ref, () => {
		return {
			scrollIntoView: () => {
				pageScrollTo({
          duration: scrollDuration,
          scrollTop: anchorTitleRectRef.current.top - stickyOffsetTop,
        })
			}
		}
	})

	useMount(() => {
		initTitleRect()
	})

	return withNativeProps(
		props,
		<view 
			className={bemElement(BLOCK, 'anchor')} 
		>
			<view 
				id={anchorTitleId}
				className={bemElement(BLOCK, 'anchor-title', {actived, sticky})}
				style={anchorStyle}
			>{ title || index }</view>

			{children}	
		</view>
	)
})

IndexBarAnchor.propTypes = {
	activeIndex: PropTypes.string,
	index: PropTypes.string,
	title: PropTypes.string,
	sticky: PropTypes.bool.isRequired,
	stickyOffsetTop: PropTypes.number.isRequired,
	scrollDuration: PropTypes.number.isRequired,
	scrollTop: PropTypes.number,
	onInitRect: PropTypes.func.isRequired
} 

export default React.memo(IndexBarAnchor)