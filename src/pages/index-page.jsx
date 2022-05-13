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
						router.toPage({page: 'button-page'})
					}}
				>Button按钮</List.Item>

				<List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'cell-page'})
					}}
				>Cell单元格</List.Item>

        <List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'icon-page'})
					}}
				>Icon图标</List.Item>

				<List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'row-page'})
					}}
				>Layout布局</List.Item>

				<List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'image-page'})
					}}
				>Image图片</List.Item>
      </List>

			<List header="反馈组件">
				<List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'loading-page'})
					}}
				>Loading加载</List.Item>
			</List>

			<List header="导航组件">
				<List.Item 
					arrow
					onClick={() => {
						router.toPage({page: 'nav-bar-page'})
					}}
				>NavBar 导航栏</List.Item>
			</List>
		</DemoPage>	
	)
}

export default IndexPage