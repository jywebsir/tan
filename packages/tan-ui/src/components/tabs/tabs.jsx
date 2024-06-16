import React, { lazy } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Stick from '../sticky'
import TabsHeader from './tabs-header'
import TabPanel from './tab-panel'
import useTabs from './use-tabs'

export const BLOCK = 'tabs'

export const TYPE_LINE = 'line'
export const TYPE_CARD = 'card'

export const Tabs = props => {
	const {
		type,
		border,
		sticky,
		zIndex,
		offsetTop,
		ellipsis,
		animated,
		navLeft,
		navRight,
		duration,
		lazyRender,
		children,
		onClickDisabled
	} = props

	const {
		ref,
		value,
		currentIndex,
		tabs,
		isLineType,
		scrollable,
		scrollWithAnimation,
		scrollLeft,
		stickyContainer,
		onClickTab,
		onTouchStart,
		onTouchMove,
		onTouchEnd
	} = useTabs(props)

	return withNativeProps(
		props,
		<view ref={ref} className={bemBlock(BLOCK, [type])}>
			<Stick 
				disabled={!sticky}
				zIndex={zIndex}
				offsetTop={offsetTop}
				container={stickyContainer}
			>
				<TabsHeader 
					tabs={tabs}
					currentValue={value}
					currentIndex={currentIndex}
					type={type}
					border={border}
					ellipse={ellipsis}
					scrollable={scrollable}
					scrollWithAnimation={scrollWithAnimation}
					scrollLeft={scrollLeft}
					isLineType={isLineType}
					left={navLeft}
					right={navRight}
					duration={duration}
					className={bemElement(BLOCK, 'header', {sticky})}
					onClickTab={onClickTab}
					onClickDisabled={onClickDisabled}
				/>	
			</Stick>

			<view 
				className={bemElement(BLOCK, 'content')}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<view 
					className={bemElement(BLOCK, 'track', {animated})}
					style={
						animated
						&&
						{
							transform: `translateX(${-100*currentIndex}%)`, 
							transitionDuration: `${duration}s`
						}
					}
				>
					{
						tabs.map((tab, index) => {
							return (
								<TabPanel 
									key={index}
									index={index} 
									currentIndex={currentIndex}
									lazyRender={lazyRender}
									animated={animated}
								>{tab.children}</TabPanel>
							)
						})
					}
				</view>
			</view>
		</view>
  )
}

Tabs.propTypes = {
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	sticky: PropTypes.bool,
	type: PropTypes.oneOf([TYPE_LINE, TYPE_CARD]),
	border: PropTypes.bool,
	swipeable: PropTypes.bool,
	animated: PropTypes.bool,
	ellipsis: PropTypes.bool,
	lazyRender: PropTypes.bool,
	duration: PropTypes.number,
	zIndex: PropTypes.number,
	offsetTop: PropTypes.number,
	swipeThreshold: PropTypes.number,
	navLeft: PropTypes.node,
	navRight: PropTypes.node,
	onClickDisabled: PropTypes.func,
	onBeforeChange: PropTypes.func
}

Tabs.defaultProps = {
	defaultValue: 0,
	border: true,
	type: TYPE_LINE,
	animated: false,
	ellipsis: true,
	lazyRender: true,
	duration: 0.3,
	zIndex: 1,
	offsetTop: 0,
	swipeThreshold: 5
}