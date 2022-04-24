import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { Button } from '@tarojs/components'
import Loading from '../loading'

const classPrefix = 'tam-button'

export const TamButton = props => {
	const {
		color,
		block,
		disabled,
		fill,
		size,
		loading,
		loadingText,
		shape,
		children,
		onClick
	} = props

	const clsName = classNames(classPrefix, {
		[`${classPrefix}-${color}`]: !!color,
		[`${classPrefix}-block`]: block,
		[`${classPrefix}-disabled`]: disabled || loading,
		[`${classPrefix}-fill-${fill}`]: !!fill,
		[`${classPrefix}-${size}`]: !!size,
		[`${classPrefix}-loading`]: loading,
		[`${classPrefix}-shape-${shape}`]: !!shape,
	})

	return withNativeProps(
		props,
		<Button
			className={clsName} 
			disabled={disabled}
			onTap={onClick} 
		>
			{
				loading
				?
				<view className={`${classPrefix}-loading-wrapper`}>
					<Loading />
					<text className={`${classPrefix}-loading-text`}>{loadingText}</text>
				</view>
				:
				children	
			}
		</Button>
	)
}

TamButton.propTypes = {
	// 按钮的颜色
	color: PropTypes.oneOf([
		'default',
		'primary',
		'success',
		'warning',
		'danger'
	]),

	// 填充模式
	fill: PropTypes.oneOf([
		'solid',
		'outline',
		'none'
	]),

	// 大小
	size: PropTypes.oneOf([
		'mini',
		'small',
		'middle',
		'large'
	]),

	// 是否是块级元素
	block: PropTypes.bool,

	// 是否禁用
	disabled: PropTypes.bool,

	// 是否处于加载状态
	loading: PropTypes.bool,

	// 加载状态下额外展示的文字	
	loadingText: PropTypes.string,

	// 按钮的形状
	shape: PropTypes.oneOf(['default', 'rounded', 'rectangular']),

	// 点击事件
	onClick: PropTypes.func
} 

TamButton.defaultProps = {
	color: 'default',
	fill: 'solid',
	size: 'middle',
	block: false,
	disabled: false,
	loading: false,
	shape: 'default'
}
