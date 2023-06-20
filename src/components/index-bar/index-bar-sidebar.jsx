import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './index-bar'
import IndexBarIndex from './index-bar-index'

const IndexBarSidebar = forwardRef((props, ref) => {
	const { 
		zIndex, 
		activeIndex, 
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
				list.map((item) => {
					const { index, brief } = item

					const actived = index === activeIndex

					return (
						<IndexBarIndex 
							zIndex={zIndex}
							key={index}
							index={index}
							actived={actived}
							onClick={onClickIndex}
						>{brief}</IndexBarIndex>
					)
				})
			}			
		</view>
	)
})

IndexBarSidebar.propTypes = {
	zIndex: PropTypes.number.isRequired,
	highlightColor: PropTypes.string,

	activeIndex: PropTypes.string,

	list: PropTypes.arrayOf([
		PropTypes.string, 
		PropTypes.number
	]).isRequired,

	onClickIndex: PropTypes.func.isRequired
} 

export default React.memo(IndexBarSidebar)


