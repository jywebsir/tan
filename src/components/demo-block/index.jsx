import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.module.scss'

const DemoBlock = props => {
	const {
		title,
		background,
		className,
		children
	} = props

	const clsName = classNames(
		style.container,
		className
	)

	const contentStyle = {
		background
	}

	return (
		<view className={clsName}>
			<view className={style.title}>{title}</view>

			<view className={style.content} style={contentStyle}>
				{children}
			</view>
		</view>
	)
}

DemoBlock.propTypes = {
	title: PropTypes.string.isRequired,
	className: PropTypes.string,
	background: PropTypes.string
} 

DemoBlock.defaultProps = {
	background: '#ffffff'
}

export default React.memo(DemoBlock)