import React from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemElement, BASE_PREFIX } from '../../utils/class-name'
import { isDef } from '../../utils/validator'
import Info from '../info'
import { BLOCK } from './tabs'

const Tab = props => {
	const {
		value,
		title,
		actived,
		disabled,
		dot,
		ellipse,
		info,
		onClick,
		onClickDisabled
	} = props

	const onTap = useMemoizedFn((event) => {
		if (disabled) {
			onClickDisabled?.({
				value,
				title
			})
			return 
		}

		onClick?.(event)
	})

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
			data-value={value}
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
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	actived: PropTypes.bool,
	disabled: PropTypes.bool,
	ellipse: PropTypes.bool,
	dot: PropTypes.bool,
	info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onClick: PropTypes.func,
	onClickDisabled: PropTypes.func
} 

export default React.memo(Tab)