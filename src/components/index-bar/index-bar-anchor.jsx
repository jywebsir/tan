import React, { useImperativeHandle, forwardRef, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useMount } from 'ahooks'
import { pageScrollTo } from "@tarojs/taro"
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import uniqueId from '../../utils/unique-id'
import { getRect } from '../../utils/helpers'
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

	const uniqueIdRef = useRef(uniqueId('index-bar-anchor'))
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
		const anchorTitleSelector = bemElement(BLOCK, 'anchor-title')	
		
		const { height, top } = await getRect(`#${uniqueIdRef.current}>>>.${anchorTitleSelector}`)

		anchorTitleRectRef.current = {
			height,
			top
		}

		return {
			height,
			top
		}
	}

	const initTitleRect = async () => {
		const { height, top } = await getAnchorTitleRect()

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
			id={uniqueIdRef.current}
			className={bemElement(BLOCK, 'anchor')} 
		>
			<view 
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