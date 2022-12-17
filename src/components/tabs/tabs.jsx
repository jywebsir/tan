import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Sticky from '../sticky'
import TabsContext from './tabs-context'
import useTabs from './use-tabs'
import TabsHeader from './tabs-header'

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
		children
	} = props

	const {
		currentIndex,
		contextValue,
		tabs,
		isLineType,
		scrollable,
		scrollWithAnimation,
		scrollLeft,
	} = useTabs(props)
	
	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, [type])}>
			<TabsContext.Provider
				value={contextValue}
			>
				{
					sticky
					?
					<Sticky
						zIndex={zIndex}
						offsetTop={offsetTop}
					>
						<TabsHeader 
							tabs={tabs}
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
							onTapTab={()=>{}}
						/>
					</Sticky>
					:
					<TabsHeader 
						tabs={tabs}
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
						onTapTab={()=>{}}
					/>	
				}

				<view className={bemElement(BLOCK, 'content')}>
					<view 
						className={bemElement(BLOCK, 'track', {animated})}
						style={
							animated
							&&
							{left: `${-100*currentIndex}%`, transitionDuration: `${duration}s`}
						}
					>
						{children}
					</view>
				</view>
			</TabsContext.Provider>
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
	swipeThreshold: PropTypes.number,
	offsetTop: PropTypes.number,
	navLeft: PropTypes.node,
	navRight: PropTypes.node
}

Tabs.defaultProps = {
	defaultValue: 0,
	type: TYPE_LINE,
	animated: false,
	ellipsis: true,
	lazyRender: true,
	duration: 0.3,
	zIndex: 1,
	swipeThreshold: 5,
	offsetTop: 0
}