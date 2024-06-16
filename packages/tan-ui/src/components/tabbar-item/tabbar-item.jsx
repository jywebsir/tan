import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isElement } from '../../utils/validator'
import Icon from '../icon'
import Info from '../info'

const BLOCK = 'tabbar-item'

export const TabbarItem = props => {
	const { 
		info, 
		name, 
		icon, 
		iconActive,
		iconPrefix, 
		dot, 
		tabIndex,
		active,
		activeColor,
		inactiveColor,
		children,
		onChange,
		onClick,
	} = props

	const itemVal = name || tabIndex
	const isActived = itemVal === active

	const handleTap = (event) => {
		event.detail = itemVal

		if (itemVal !== active) {
			onChange(event)
		}

		if (onClick) {
			onClick(event)
		}
	}

	const renderIcon = () => {
		if (isActived && iconActive) {
			if (isElement(iconActive)) {
				return iconActive
			}

			return (
				<Icon 
					name={iconActive} 
					classPrefix={iconPrefix} 
					className={bemElement(BLOCK, 'icon__inner')}
				/>
			)
		}

		if (isElement(icon)) {
			return icon
		}

		return (
			<Icon name={icon} 
				classPrefix={iconPrefix} 
				className={bemElement(BLOCK, 'icon__inner')} 
			/>
		)
	}

	return withNativeProps(
		props,
		<view 
			className={bemBlock(BLOCK, {active: isActived})}
			style={{color: isActived ? activeColor : inactiveColor}}
			onTap={handleTap}
		>
			<view className={bemElement(BLOCK, 'icon')}>
				{renderIcon()}

				<Info dot={dot} info={info} className={bemElement(BLOCK, 'info')} />
			</view>

			<view className={bemElement(BLOCK, 'text')}>{children}</view>
		</view>
	)
}

TabbarItem.propTypes = {
	tabIndex: PropTypes.number,
	active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string,
	info: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	iconActive: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	iconPrefix: PropTypes.string,
	dot: PropTypes.bool,
	onClick: PropTypes.func,
	onChange: PropTypes.func.isRequired
}

TabbarItem.defaultProps = {
	iconPrefix: 'van-icon',
	dot: false
}

