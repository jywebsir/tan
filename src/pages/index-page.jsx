import React from 'react'
import router from '@/lib/router'
import DemoPage from '../components/demo-page'
import List from '@/tan/components/list'

const IndexPage = () => {
	return (
		<DemoPage>
			<List header="基础组件">
        <List.Item 
					arrow
					onClick={() => {
						router.toIconPage()
					}}
				>Icon图标</List.Item>
      </List>
		</DemoPage>	
	)
}

export default IndexPage