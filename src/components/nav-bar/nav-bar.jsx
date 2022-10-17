import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Taro from '@tarojs/taro'
import { useMount, useMemoizedFn, useUpdateEffect } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement, getBlockName } from '../../utils/class-name'
import { getStatusBarHeight, isIos } from '../../utils/system'
import { getRect } from '../../utils/helpers'
import Icon from '../icon'

const BLOCK = 'nav-bar'
const BLOCK_NAME = getBlockName('nav-bar')

export const NavBar = props => {
	const ref = useRef()

	const { 
		fixed,
		placeholder,
		title,
		border, 
		zIndex, 
		leftArrow,
		leftText,
		rightText,
		safeAreaInsetTop,
		onClickLeft,
		onClickRight
	} = props

	const [height, setHeight] = useState(46)
	const [statusBarHeight, setStatusBarHeight] = useState(null)
	const [isIos, setIsIos] = useState(false)

	const updateHeight = () => {
		if (!fixed || !placeholder) {
			return 
		}

		wx.nextTick(async () => {
			const rect = await getRect(`#${ref.current.id}`)

			setHeight(rect.height)	
		})
	}

	useMount(() => {
		const statusBarHeight = getStatusBarHeight()
		const isIos = isIos()

		setStatusBarHeight(statusBarHeight)	
		setHeight(46 + statusBarHeight)
		setIsIos(isIos)

		updateHeight()
	})

	useUpdateEffect(() => {
		updateHeight()
	}, [fixed, placeholder])

	const renderLeftArrow = useMemoizedFn(() => {
		if (!leftArrow) {
			return null
		}

		if (typeof leftArrow === 'boolean') {
			return (
				<Icon 
					name="arrow-left" 
					className={bemElement(BLOCK, 'arrow')} 
				/>
			)
		}

		return leftArrow
	})

	return (
		<>
			{
				fixed
				&&
				placeholder
				&&
				<view style={{height: `${height}px`}}/>
			}

			{
				withNativeProps(
					props,
					<view 
						id={ref.current ? ref.current.uid : null}
						ref={ref} 
						className={
							bemBlock(BLOCK, { border, ios: isIos, fixed})
						}
						style={{
							zIndex, 
							paddingTop: safeAreaInsetTop ? `${statusBarHeight}PX`: 0
						}}
					>
						<view className={bemElement(BLOCK, 'content')}>
							<view 
								className={bemElement(BLOCK, 'left')} 
								onTap={onClickLeft}
							>
								{renderLeftArrow()}
	
								{
									leftText
									&&
									<view 
										className={bemElement(BLOCK, 'text')} 
										hoverClass={`${BLOCK_NAME}__text--hover`}
										hoverStayTime={70}
									>
										{leftText}
									</view>
								}
							</view>
	
							<view className={bemElement(BLOCK, 'title')}>
								{title}
							</view>
	
							<view className={bemElement(BLOCK, 'right')} onTap={onClickRight}>
								{
									rightText
									&&
									<view
										className={bemElement(BLOCK, 'text')} 
										hoverClass={`${BLOCK_NAME}__text--hover`}
										hoverStayTime={70}
									>{rightText}</view>
								}
							</view>
						</view>
					</view>
				)
			}
		</>
	)
}

NavBar.propTypes = {
	fixed: PropTypes.bool,
	placeholder: PropTypes.bool,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	leftArrow: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
	leftText: PropTypes.string,
	rightText: PropTypes.string,
	placeholder: PropTypes.bool,
	border: PropTypes.bool,
	safeAreaInsetTop: PropTypes.bool,
	zIndex: PropTypes.number,
	onClickLeft: PropTypes.func,
	onClickRight: PropTypes.func
}

NavBar.defaultProps = {
	fixed: false,
	placeholder: false,
	border: true,
	safeAreaInsetTop: true,
	zIndex: 1
}

