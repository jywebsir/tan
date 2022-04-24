import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Icon from '../icon'
import { withNativeProps } from '@/tan/utils/native-props'

const classPrefix = `tan-list-item`

const ListItem = props => {
	const {
		clickable,
		arrow,	
		prefix,
		title,
		description,
		children,
		extra,	
		disabled,
		onClick	
	} = props

	const activeClick = clickable ?? !!onClick
	const activeArrow = arrow === undefined ? activeClick : arrow

	const content = (
    <view className={`${classPrefix}-content`}>
      {
				prefix 
				&& 
				<view className={`${classPrefix}-content-prefix`}>{prefix}</view>
			}

      <view className={`${classPrefix}-content-main`}>
        {
					title 
					&& 
					<view className={`${classPrefix}-title`}>{title}</view>
				}

        {children}

        {
					description 
					&& 
					<view className={`${classPrefix}-description`}>
						{description}
					</view>
				}
      </view>

      {
				extra 
				&& 
				<view className={`${classPrefix}-content-extra`}>{extra}</view>
			}

      {
				arrow 
				&& 
				(
					<view className={`${classPrefix}-content-arrow`}>
						{
							arrow === true 
							? 
							<Icon name="arrow" /> 
							: 
							arrow
						}
					</view>
				)
			}
    </view>
  )

	const clsName = classNames(
		`${classPrefix}`,
		disabled && `${classPrefix}-disabled`
	)

	const handleClick = disabled ? undefined : onClick

	return withNativeProps(
    props,
		<view 
			className={clsName}
			hoverClass={activeClick && !disabled && `${classPrefix}-clickable`}
			hoverStayTime={70}
			onClick={handleClick}
		>
			{content}	
		</view>
  )
}

ListItem.propTypes = {
	title: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node,
  prefix: PropTypes.node,
  extra: PropTypes.node,
  clickable: PropTypes.bool,
  arrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),  
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default React.memo(ListItem)