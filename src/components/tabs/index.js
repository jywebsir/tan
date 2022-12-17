import React from 'react'
import attachPropertiesToComponent from '../../utils/attach-properties-to-component'
import './tabs.scss'
import { Tabs } from './tabs'
import { TabPanel } from './tab-panel'

export default attachPropertiesToComponent(React.memo(Tabs), {
  TabPanel: React.memo(TabPanel),
})
