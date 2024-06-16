import React from 'react'
import PropTypes from 'prop-types'
import { bemElement } from '../../utils/class-name'
import useTabPanel from './use-tab-panel'
import { BLOCK } from './tabs'

export const TabPanel = props => {
	const {
		actived,
		shouldRender,
		show	
	} = useTabPanel(props)

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
				props.children
			}
		</view>
	)
}

TabPanel.propTypes = {
	index: PropTypes.number,
	lazyRender: PropTypes.bool,
	animated: PropTypes.bool
}

export default React.memo(TabPanel)
