import React from 'react'
import PropTypes from 'prop-types'
import { bemElement } from '../../utils/class-name'
import useTabPanel from './use-tab-panel'
import { BLOCK } from './tabs'

export const TabPanel = props => {
	const {
		index,
		children
	} = props

	const {
		actived,
		shouldRender,
		show	
	} = useTabPanel({index})

	return (
		<view className={
			bemElement(
				BLOCK, 
				'panel', 
				{
					actived, 
					inactive: !actived,
					show
				}
			)
		}>
			{
				shouldRender
				&&
				children
			}
		</view>
	)
}

TabPanel.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	index: PropTypes.number,
	title: PropTypes.string.isRequired,
	disabled: PropTypes.bool,
	info: PropTypes.string,
	dot: PropTypes.bool
}

