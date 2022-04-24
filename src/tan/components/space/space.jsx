import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = `tan-space`

export const Space = props => {
	const { 
		direction, 
		justify,
		align,
		wrap,
		block,
		children,
		onClick 
	} = props

	const clsName = classNames(classPrefix, {
		[`${classPrefix}-wrap`]: wrap,
		[`${classPrefix}-block`]: block,
		[`${classPrefix}-${direction}`]: true,
		[`${classPrefix}-align-${align}`]: !!align,
		[`${classPrefix}-justify-${justify}`]: !!justify,
	})

	return withNativeProps(
		props,
		<view className={clsName} onClick={onClick}>
			{React.Children.map(children, child => {
        return (
          child !== null &&
          child !== undefined 
					&& (
            <view className={`${classPrefix}-item`}>{child}</view>
          )
        )
      })}
		</view>
	) 
}

Space.propTypes = {
	// 间距方向
	direction: PropTypes.oneOf([
		'horizontal', 
		'vertical'
	]),

	// 交叉轴对齐方式
	justify: PropTypes.oneOf([
		'start', 
		'end', 
		'center', 
		'between', 
		'around', 
		'evenly', 
		'stretch'
	]),

	//主轴对齐方式
	align: PropTypes.oneOf([
		'start', 
		'end', 
		'center', 
		'baseline'
	]),

	// 是否自动换行，仅在 horizontal 时有效
	wrap: PropTypes.bool,

	// 是否渲染为块级元素
	block: PropTypes.bool,

	// 点击事件
	onClick: PropTypes.func
} 

Space.defaultProps = {
	direction: 'horizontal',
	wrap: false,
	block: false
}


