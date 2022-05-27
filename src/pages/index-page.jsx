import React from 'react'
import router from '@/lib/router'
import DemoPage from '../components/demo-page'
import CellGroup from '../tan/components/cell-group'
import Cell from '../tan/components/cell'

const IndexPage = () => {
	return (
		<DemoPage>
			<CellGroup title="基础组件">
				<Cell 
					title="Button按钮" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'button-page'})
					}}	
				/>

				<Cell 
					title="Cell单元格" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'cell-page'})
					}}	
				/>

				<Cell 
					title="Icon图标" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'icon-page'})
					}}	
				/>
				
				<Cell 
					title="Layout布局" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'row-page'})
					}}	
				/>

				<Cell 
					title="Image图片" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'image-page'})
					}}	
				/>
			</CellGroup>

			<CellGroup title="表单组件">
				<Cell 
					title="Field输入框" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'field-page'})	
					}}	
				/>
			</CellGroup>

			<CellGroup title="反馈组件">
				<Cell 
					title="Loading加载" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'loading-page'})
					}}	
				/>
			</CellGroup>

			<CellGroup title="展示组件">
				<Cell 
					title="Empty空状态" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'empty-page'})
					}}	
				/>
			</CellGroup>

			<CellGroup title="导航组件">
				<Cell 
					title="NavBar 导航栏" 
					rightIcon
					clickable
					onClick={() => {
						router.toPage({page: 'nav-bar-page'})
					}}	
				/>
			</CellGroup>
		</DemoPage>	
	)
}

export default IndexPage