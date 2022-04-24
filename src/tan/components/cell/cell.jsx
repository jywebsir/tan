import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'

export const Cell = props => {
	const {
		icon,
		title,
		value,
		label,
		size,
		border,
		center,
		clickable,
		arrow,
		required,
		hoverClass,
		onClick
	} = props

	return (
		<view>

		</view>
	)
}

Cell.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number,
		PropTypes.node
	]),
	value: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.number,
		PropTypes.node
	]),
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node
	]),
	size: PropTypes.string,
	border: PropTypes.bool,
	center: PropTypes.bool,
	clickable: PropTypes.bool,
	arrow: PropTypes.onOfType([PropTypes.bool, PropTypes.node]),
	required: PropTypes.bool,
	hoverClass: PropTypes.string,
	onClick: PropTypes.func
}

Cell.defaultProps = {
	border: true,
	center: false,
	clickable: false,
	arrow: false,
	required: false
}