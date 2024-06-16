import React from 'react'
import PropTypes from 'prop-types'
import useIndexBar from './use-index-bar'
import IndexBarView from './index-bar-view'
import { withNativeProps } from '../../utils/native-props'

export const BLOCK = 'index-bar'

export const IndexBar = React.forwardRef((props, ref) => {
	const { 
		sticky, 
		stickyOffsetTop,
		scrollDuration,
		safeAreaBottom,
		showBackOffsetTop,
		lazyRender,
		lazyRenderOffsetTop,
		initActiveGroupIndexes,
		disableSidebar,
		children,
		onSelect 
	} = props

	const {
		activeIndex,
		scrollTop,
		anchorRefs,
		indexes,
		showBackTop,
		activeGroupIndexes,
		onInitAnchorRect,
		onClickSideBarIndex
	} = useIndexBar({
		ref,
		children,
		scrollDuration,
		sticky,
		stickyOffsetTop,
		showBackOffsetTop,
		lazyRender,
		lazyRenderOffsetTop,
		initActiveGroupIndexes,
		onSelect
	})

	return withNativeProps(
		props,
		<IndexBarView
			blockName={BLOCK}
			safeAreaBottom={safeAreaBottom}	
			anchorRefs={anchorRefs}
			indexes={indexes}
			stickyOffsetTop={stickyOffsetTop}
			scrollDuration={scrollDuration}
			scrollTop={scrollTop}
			sticky={sticky}
			activeIndex={activeIndex}
			lazyRender={lazyRender}
			disableSidebar={disableSidebar}
			showBackTop={showBackTop}
			activeGroupIndexes={activeGroupIndexes}
			onInitAnchorRect={onInitAnchorRect}
			onClickSideBarIndex={onClickSideBarIndex}
		>
			{children}
		</IndexBarView>	
	)
})

IndexBar.propTypes = {
	sticky: PropTypes.bool,
	stickyOffsetTop: PropTypes.number,
	scrollDuration: PropTypes.number,
	showBackOffsetTop: PropTypes.number, 
	lazyRender: PropTypes.bool,
	lazyRenderOffsetTop: PropTypes.number,
	initActiveGroupIndexes: PropTypes.arrayOf(PropTypes.string),
	safeAreaBottom: PropTypes.bool,
	disableSidebar: PropTypes.bool,
	onSelect: PropTypes.func
}

IndexBar.defaultProps = {
	stickyOffsetTop: 0,
	scrollDuration: 100,
	showBackOffsetTop: 2000,
	sticky: true,
	lazyRender: false,
	lazyRenderOffsetTop: 700,
	safeAreaBottom: true,
	disableSidebar: false
}