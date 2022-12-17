import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemElement, BASE_PREFIX } from '../../utils/class-name'
import Info from '../info'
import { BLOCK } from './tabs'

const Tab = props => {
	const {
		title,
		actived,
		disabled,
		dot,
		ellipse,
		info,
		onTap
	} = props

	return withNativeProps(
		props,
		<view 
			className={
				bemElement(
					BLOCK, 
					'tab',
					{
						actived,
						disabled,
						complete: !ellipse
					}
				)
			}
			onTap={onTap}
		>
			<view className={bemElement(
				BLOCK, 
				'title', 
				[ellipse&&`${BASE_PREFIX}-ellipse`]
			)}>
				{title}
				{
					(!!info || !!dot)
					&&
					<Info 
						info={info}
						dot={dot}
						className={bemElement(BLOCK, 'info')}
					/>
				}
			</view>
		</view>
	)
}

Tab.propTypes = {
	title: PropTypes.string.isRequired,
	actived: PropTypes.bool,
	disabled: PropTypes.bool,
	ellipse: PropTypes.bool,
	dot: PropTypes.bool,
	info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onTap: PropTypes.func
} 

export default React.memo(Tab)