import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import './tabs.scss'
import { Tabs } from './tabs'
import Tab from './tab'

export default attachPropertiesToComponent(React.memo(Tabs), {
  Tab
})
