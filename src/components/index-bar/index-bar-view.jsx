import React, { Children } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import isFunction from '../../utils/is-function'
import BackTop from '../back-top'
import IndexBarSidebar from './index-bar-sidebar'
import IndexBarAnchor from './index-bar-anchor'
import IndexBarGroup from './index-bar-group'

const IndexBarView = props => {
	const { 
		blockName, 
		safeAreaBottom, 
		stickyOffsetTop,
		scrollDuration,
		scrollTop,
		sticky,
		lazyRender,
		children, 
		anchorRefs,
		indexes,
		activeIndex,
		activeGroupIndexes,
		showBackTop,
		onInitAnchorRect,
		onClickSideBarIndex
	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(blockName, [safeAreaBottom && 'safe-area-bottom'])}>
			{
				Children.map(children, (child) => {
					if (!React.isValidElement(child)) return null

					if (child.type !== IndexBarGroup) {
						return null
					}

					const refAnchor = anchorRefs[child.props.index]

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
							scrollTop={scrollTop}
							onInitRect={onInitAnchorRect}
						>
							{
								lazyRender && isFunction(child.props.children)
								?
								child.props.children({activeGroupIndexes})
								:
								child.props.children
							}
						</IndexBarAnchor>	
					)
				}) 
			}

			<IndexBarSidebar 
				activeIndex={activeIndex}
				list={indexes}
				onClickIndex={onClickSideBarIndex}
			/>

			<BackTop show={showBackTop} />
		</view>
	)
}

IndexBarView.propTypes = {
	blockName: PropTypes.string.isRequired,
	safeAreaBottom: PropTypes.bool.isRequired,
	anchorRefs: PropTypes.object.isRequired,
	indexes: PropTypes.arrayOf(PropTypes.shape({
		index: PropTypes.string.isRequired,
		brief: PropTypes.string.isRequired
	})).isRequired,
	stickyOffsetTop: PropTypes.number.isRequired,
	scrollDuration: PropTypes.number.isRequired,
	scrollTop: PropTypes.number.isRequired,
	sticky: PropTypes.bool.isRequired,
	showBackTop: PropTypes.bool.isRequired,
	lazyRender: PropTypes.bool.isRequired,
	activeIndex: PropTypes.string,
	activeGroupIndexes: PropTypes.arrayOf(PropTypes.string),
	onInitAnchorRect: PropTypes.func.isRequired,
	onClickSideBarIndex: PropTypes.func.isRequired
}

export default React.memo(IndexBarView)