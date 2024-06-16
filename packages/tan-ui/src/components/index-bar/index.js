import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import './index-bar.scss'
import { IndexBar } from './index-bar'
import IndexBarGroup from './index-bar-group'

export default attachPropertiesToComponent(
	React.memo(IndexBar), 
	{
		Group: IndexBarGroup	
	}
)