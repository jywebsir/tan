import React from 'react'
import { useMemoizedFn } from 'ahooks'
import router from '../lib/router'
import DemoPage from '../components/demo-page'
import CellGroup from '@/components/cell-group'
import Cell from '@/components/cell'

const IndexPage = () => {
	const onClickCell = useMemoizedFn((event) => {
		const { page } = event.currentTarget.dataset

		router.toPage({page: `${page}-page`})	
	})

	return (
		<DemoPage>
			<CellGroup title="反馈组件">
				<Cell 
					title="Loading加载" 
					data-page="loading"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>
		</DemoPage>	
	)
}

export default IndexPage