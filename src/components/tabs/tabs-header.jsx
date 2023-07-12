import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { bemElement, BASE_PREFIX } from '../../utils/class-name'
import { convertRpx } from '../../utils/unit'
import { BLOCK, TYPE_LINE } from './tabs'
import Tab from './tab'
import useTabsHeader from './use-tabs-header'

const TabsHeader = props => {
	const {
		tabs,
		currentValue,
		currentIndex,
		scrollable,
		type,
		border,
		ellipse,
		left,
		right,
		isLineType,
		duration,
		onClickTab,
		onClickDisabled
	} = props

	const {
		headerRef,
		skipTransition,
		scrollWithAnimation,
		scrollLeft,
		lineOffsetLeft 
	} = useTabsHeader({
		currentIndex,
		scrollable,
		ellipse,
		isLineType
	})

	const lineStyle = useMemo(() => {
		if (!isLineType) {
			return null
		}

		return {
			transform: `translateX(${lineOffsetLeft}px)`,
			transitionDuration: !skipTransition ? `${duration}s` : null
		}
	}, [isLineType, lineOffsetLeft, skipTransition, duration])

	return withNativeProps(
		props,
		<view 
			ref={headerRef}
			className={classNames(
				bemElement(
					BLOCK, 
					'header', 
					{scrollable} 
				), 
				isLineType 
				&& 
				border 
				&& 
				[
					`${BASE_PREFIX}-hairline`,
					`${BASE_PREFIX}-hairline--top-bottom`
				]
			)}
		>
			{left}

			<scroll-view
				scrollX={scrollable}
				scrollWithAnimation={scrollWithAnimation}
				scrollLeft={scrollLeft}
				className={bemElement(BLOCK, 'scroll', [type])}
				enablePassive
			>
				<view className={bemElement(
					BLOCK, 
					'nav',
					[type, {complete: !ellipse}]
				)}>
					{
						isLineType
						&&
						<view 
							className={bemElement(BLOCK, 'line')} 
							style={lineStyle}
						/>
					}

					{
						tabs.map((tab) => {
							const { disabled, title, dot, info, value } = tab

							return (
								<Tab 
									key={value}
									value={value}
									title={title}
									actived={value === currentValue}
									disabled={disabled}
									ellipse={ellipse}
									dot={dot}
									info={info}
									onClick={onClickTab}
									onClickDisabled={onClickDisabled}
								/>
							)
						})
					}
				</view>
			</scroll-view>

			{right}
		</view>
	)
}

TabsHeader.propTypes = {
	tabs: PropTypes.array.isRequired,
	currentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
	onClickTab: PropTypes.func.isRequired
} 

export default React.memo(TabsHeader)
