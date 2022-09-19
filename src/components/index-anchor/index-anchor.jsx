import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import uniqueId from '../../utils/unique-id'
import { getRect } from '../../utils/helpers'

const BLOCK = 'index-anchor'

export const IndexAnchor = forwardRef((props, ref) => {
	const { 
		actived, 
		index,
		wrapperStyle, 
		anchorStyle, 
		stickyOffsetTop,
		children 
	} = props

	const uniqueIdRef = useRef(uniqueId('index-anchor'))

	useImperativeHandle(ref, () => {
		return {
			scrollIntoView: async (scrollTop) => {
				const rect = await getRect(`#${uniqueIdRef.current}`)

				wx.pageScrollTo({
          duration: 0,
          scrollTop: scrollTop + rect.top - stickyOffsetTop,
        })
			}
		}
	})

	return withNativeProps(
		props,
		<view 
			id={uniqueIdRef.current}
			className={bemBlock(BLOCK)} 
			style={wrapperStyle ? wrapperStyle : {}}
		>
			<view 
				className={bemElement(BLOCK, 'content', {actived})}
				style={anchorStyle ? anchorStyle : {}}
			>
				{
					children
					?
					children
					:
					<text>{index}</text>
				}
			</view>
		</view>
	)
})

IndexAnchor.propTypes = {
	actived: PropTypes.bool,
	wrapperStyle: PropTypes.object,
	anchorStyle: PropTypes.object,
	index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	stickyOffsetTop: PropTypes.number.isRequired
} 