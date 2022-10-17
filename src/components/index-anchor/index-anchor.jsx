import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { pageScrollTo } from "@tarojs/taro"
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import uniqueId from '../../utils/unique-id'
import { getRect} from '../../utils/helpers'

const BLOCK = 'index-anchor'

export const IndexAnchor = forwardRef((props, ref) => {
	const { 
		activeIndex,
		index,
		stickyOffsetTop,
		scrollDuration,
		children 
	} = props

	const uniqueIdRef = useRef(uniqueId('index-anchor'))

	let actived = activeIndex === index

	useImperativeHandle(ref, () => {
		return {
			scrollIntoView: async (scrollTop) => {
				const rect = await getRect(`#${uniqueIdRef.current}`)

				pageScrollTo({
          duration: 100,
          scrollTop: scrollTop + rect.top - stickyOffsetTop,
        })
			},
		}
	})

	return withNativeProps(
		props,
		<view 
			id={uniqueIdRef.current}
			className={bemBlock(BLOCK)} 
		>
			<view 
				className={bemElement(BLOCK, 'content', {actived})}
			>{children??<text>{index}</text>}</view>
		</view>
	)
})

IndexAnchor.propTypes = {
	activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	stickyOffsetTop: PropTypes.number.isRequired,
	scrollDuration: PropTypes.number.isRequired
} 