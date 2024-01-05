import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import { Notify } from './notify'
import './notify.scss'
import { openNotify, closeNotify } from './use-notify'

export default attachPropertiesToComponent(React.memo(Notify), {
	open: openNotify,
	close: closeNotify	
})