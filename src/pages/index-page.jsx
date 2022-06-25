import React from 'react'
import { useMemoizedFn } from 'ahooks'
import router from '@/lib/router'
import DemoPage from '../components/demo-page'
import CellGroup from '../tan/components/cell-group'
import Cell from '../tan/components/cell'

const IndexPage = () => {
	const onClickCell = useMemoizedFn((event) => {
		const { page } = event.currentTarget.dataset

		router.toPage({page: `${page}-page`})	
	})

	return (
		<DemoPage>
			<CellGroup title="基础组件">
				<Cell 
					title="Button按钮" 
					data-page="button"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Cell单元格" 
					data-page="cell"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Icon图标" 
					data-page="icon"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
				
				<Cell 
					title="Layout布局" 
					data-page="row"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Popup弹出层" 
					data-page="popup"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Image图片" 
					data-page="image"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Toast轻提示" 
					data-page="toast"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="transition动画" 
					data-page="transition"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="表单组件">
				<Cell 
					title="Field输入框" 
					data-page="field"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Search搜索" 
					data-page="search"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Uploader文件上传" 
					data-page="uploader"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="反馈组件">
				<Cell 
					title="Dialog弹出框" 
					data-page="dialog"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Loading加载" 
					data-page="loading"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Overlay遮罩层" 
					data-page="overlay"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="展示组件">
				<Cell 
					title="Collapse折叠面板" 
					data-page="collapse"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Empty空状态" 
					data-page="empty"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="导航组件">
				<Cell 
					title="NavBar 导航栏" 
					data-page="nav-bar"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Tabbar 标签栏" 
					data-page="tabbar"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>
		</DemoPage>	
	)
}

export default IndexPage