import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement, BASE_PREFIX } from '../../utils/class-name'
import { BLOCK, TYPE_LINE } from './tabs'
import Tab from './tab'
import useTabHeader from './use-tab-header'

const TabHeader = props => {
	const {
		tabs,
		currentIndex,
		scrollable,
		type,
		border,
		ellipse,
		left,
		right,
		isLineType,
		onTapTab
	} = props

	const {
		headerRef,
		scrollWithAnimation,
		scrollLeft,
		lineOffsetLeft 
	} = useTabHeader({
		currentIndex,
		scrollable,
		ellipse,
		isLineType
	})

	return withNativeProps(
		props,
		<view 
			ref={headerRef}
			className={bemElement(
				BLOCK, 
				'header', 
				[
					{scrollable}, 
					isLineType && border && `${BASE_PREFIX}-hairline--top-bottom`
				]
			)}
		>
			{left}

			<scroll-view
				scroll-x={scrollable}
				scroll-with-animation={scrollWithAnimation}
				scroll-left={scrollLeft}
				className={bemElement(BLOCK, 'scroll', [type])}
			>
				<view className={bemElement(
					BLOCK, 
					'nav',
					[type, {complete: !ellipse}]
				)}>
					{
						isLineType
						&&
						<view clasName={bemElement(BLOCK, 'line')} />
					}

					{
						tabs.map((tab, index) => {
							const { disabled, title, dot, info } = tab

							return (
								<Tab 
									key={index}
									title={title}
									actived={index === currentIndex}
									disabled={disabled}
									ellipse={ellipse}
									dot={dot}
									info={info}
									onTap={onTapTab}
								/>
							)
						})
					}
				</view>
			</scroll-view>
		</view>
	)
}

TabHeader.propTypes = {
	tabs: PropTypes.array.isRequired,
	currentIndex: PropTypes.number,
	scrollable: PropTypes.bool,
	scrollWithAnimation: PropTypes.bool,
	scrollLeft: PropTypes.number,
	ellipse: PropTypes.bool,
	border: PropTypes.bool,
	type: PropTypes.string,
	isLineType: PropTypes.bool,
	left: PropTypes.node,
	right: PropTypes.node,
	onTapTab: PropTypes.func
} 

export default React.memo(TabHeader)
