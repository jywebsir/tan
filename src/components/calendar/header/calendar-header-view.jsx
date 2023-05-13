import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../../utils/native-props'
import { bemBlock, bemElement } from '../../../utils/class-name'
import { propTypes } from './props'
import { BLOCK } from '../config'

const CalendarHeaderView = props => {
	const {
		showTitle,
		showSubtitle,
		title,
		subtitle,
		weekdays,
		onClickSubtitle
	} = props

	return withNativeProps(
		props,
		<view className={bemElement(BLOCK, 'header')}>
			{
				showTitle
				&&
				<view className={bemElement(BLOCK, 'header-title')}>{title}</view>
			}

			{
				showSubtitle
				&&
				<view 
					className={bemElement(BLOCK, 'header-subtitle')}
					onTap={onClickSubtitle}
				>{subtitle}</view>
			}

			<view className={bemElement(BLOCK, 'header-weekdays')}>
			{
				weekdays.map((day, index) => {
					return (
						<view 
							key={index} 
							className={bemBlock(BLOCK, 'header-weekday')}
						>{day}</view>
					)
				})
			}
			</view>
		</view>
	)
}

CalendarHeaderView.propTypes = {
	...propTypes
	weekdays: PropTypes.arrayOf(PropTypes.string),
} 

export default React.memo(CalendarHeaderView)