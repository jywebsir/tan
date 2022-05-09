import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import style from './style.module.scss'

const DemoBlock = props => {
	const {
		title,
		padding,
		card,
		className,
		children
	} = props

	const clsName = classNames(
		style.container,
		padding&&style.padding,
		className
	)

	return (
		<view className={clsName}>
			{
				title
				&&
				<view className={style.title}>{title}</view>
			}

			{
				card
				?
				<view className={style.card}>
					{children}
				</view>
				:
				children
			}
		</view>
	)
}

DemoBlock.propTypes = {
	title: PropTypes.string.isRequired,
	padding: PropTypes.bool,
	card: PropTypes.bool,
	className: PropTypes.string
} 

export default React.memo(DemoBlock)