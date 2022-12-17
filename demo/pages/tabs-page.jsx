import React, { useState } from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Tabs from '@/components/tabs'

const TabsPage = () => {
	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<Tabs value={1}>
					<Tabs.TabPanel title="标签1">
						<view>内容1</view>
					</Tabs.TabPanel>	

					<Tabs.TabPanel title="标签2">
						<view>内容2</view>
					</Tabs.TabPanel>	

					<Tabs.TabPanel title="标签3">
						<view>内容3</view>
					</Tabs.TabPanel>	
				</Tabs>
			</DemoBlock>
		</DemoPage>
	)
}

export default TabsPage