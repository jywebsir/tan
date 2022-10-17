import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './index-bar'
import IndexBarIndex from './index-bar-index'

const IndexBarSidebar = forwardRef((props, ref) => {
	const { 
		zIndex, 
		highlightColor, 
		activeAnchorIndex, 
		list,
		onClickIndex 
	} = props

	return withNativeProps(
		props,
		<view 
			ref={ref}
			className={bemElement(BLOCK, 'sidebar')}
		>
			{
				list.map((item, index) => {
					const actived = item === activeAnchorIndex

					return (
						<IndexBarIndex 
							zIndex={zIndex}
							key={item}
							highlightColor={highlightColor}
							index={index}
							actived={actived}
							onClick={onClickIndex}
						>{item}</IndexBarIndex>
					)
				})
			}			
		</view>
	)
})

IndexBarSidebar.propTypes = {
	zIndex: PropTypes.number.isRequired,
	highlightColor: PropTypes.string,

	activeAnchorIndex: PropTypes.number.isRequired,

	list: PropTypes.arrayOf([
		PropTypes.string, 
		PropTypes.number
	]).isRequired,

	onClickIndex: PropTypes.func.isRequired
} 

export default React.memo(IndexBarSidebar)


