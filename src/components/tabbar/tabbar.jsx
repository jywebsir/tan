import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useUpdateEffect, useMemoizedFn } from 'ahooks'
import Taro from '@tarojs/taro'
import { withNativeProps } from '../../utils/native-props'
import { getBoundingClientRect } from '../../utils/helpers'
import { bemBlock } from '../../utils/class-name'

const BLOCK = 'tabbar'

export const TabBar = props => {
	const {
		active,
		activeColor,
		inactiveColor,
		fixed, 
		placeholder,
		border,
		zIndex,
		safeAreaInsetBottom,
		children,
		onChange
	} = props

	const ref = useRef()
	const [height, setHeight] = useState(50)

	const updateHeight = useMemoizedFn(() => {
		if (!fixed || !placeholder) {
			return
		}

		getBoundingClientRect(
			`#${ref.current.id}`,
			function(rect) {
				setHeight(rect.height)
			}
		)	
	})

	useUpdateEffect(() => {
		updateHeight()
	}, [fixed, placeholder])

	const blockClsName = classNames(
		bemBlock(BLOCK, {fixed, safe: safeAreaInsetBottom}),
		border&&'tan-hairline--top-bottom'
	)

	const style = zIndex ? {zIndex} : {}

	const tabBarItems = React.Children.map(children, (item, tabIndex) => {
		const p = {
			...item.props,
			tabIndex,
			active,
			activeColor,
			inactiveColor,
			onChange
		}

		for (const key in props) {
			if (!props.hasOwnProperty(key)) continue
			if (key.startsWith('data-') || key.startsWith('aria-')) {
				p[key] = props[key]
			}
		}

		return React.cloneElement(item, p)
	})

	return (
		<>
			{withNativeProps(
				props,
				<view 
					ref={ref}
					id={ref.current ? ref.current.uid : null}
					className={blockClsName}
					style={style}
				>
					{tabBarItems}
				</view>
			)}

			{
				fixed
				&&
				placeholder
				&&
				<view style={{height: `${height}px`}} />
			}
		</>
	)
}

TabBar.propTypes = {
	active: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	activeColor: PropTypes.string,
	inactiveColor: PropTypes.string,
	fixed: PropTypes.bool,
	placeholder: PropTypes.bool,
	border: PropTypes.bool,
	zIndex: PropTypes.number,
	safeAreaInsetBottom: PropTypes.bool,
	onChange: PropTypes.func.isRequired
}

TabBar.defaultProps = {
	activeColor: '#1989fa',
	inactiveColor: '#7d7e80',	
	fixed: true,
	placeholder: false,
	border: true,
	zIndex: 1,
	safeAreaInsetBottom: true
}