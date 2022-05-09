import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMount, useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement, getBlockName } from '../../utils/class-name'
import System from '../../utils/system'
import Icon from '../icon'

const BLOCK = 'nav-bar'
const BLOCK_NAME = getBlockName('nav-bar')

export const NavBar = props => {
	const { 
		title,
		fixed, 
		placeholder, 
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

	useMount(() => {
		const { statusBarHeight } = System.getSystemInfoSync()

		setStatusBarHeight(statusBarHeight)	
		setHeight(height+statusBarHeight)
	})

	const renderLeftArrow = useMemoizedFn(() => {
		if (!leftArrow) {
			return null
		}

		if (typeof leftArrow === 'string') {
			return (
				<Icon 
					name="arrowLeft" 
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
				<view style={{height: `${height}px`}} />
			}

			<view 
				className={bemBlock(BLOCK, {fixed, border})}
				style={{zIndex, paddingTop: safeAreaInsetTop ? `${statusBarHeight}px` : 0}}
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
		</>

		
	)
}

NavBar.propTypes = {
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
	border: true,
	safeAreaInsetTop: true,
	zIndex: 1
}

