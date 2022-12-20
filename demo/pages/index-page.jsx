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
					title="Calendar日历" 
					data-page="calendar"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Field输入框" 
					data-page="field"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Radio单选框" 
					data-page="radio"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Checkbox复选框" 
					data-page="checkbox"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Switch开关" 
					data-page="switch"
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

				<Cell 
					title="DropdownMenu 下拉菜单" 
					data-page="dropdown-menu"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="PullRefresh 下拉刷新" 
					data-page="pull-refresh"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="展示组件">
				<Cell 
					title="幻灯片" 
					data-page="carousel"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
				
				<Cell 
					title="Collapse折叠面板" 
					data-page="collapse"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Divider分割线" 
					data-page="divider"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Progress 进度条" 
					data-page="progress"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="CountDown倒计时" 
					data-page="count-down"
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

				<Cell 
					title="Sticky粘性布局" 
					data-page="sticky"
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

				<Cell 
					title="IndexBar 索引栏" 
					data-page="index-bar"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Tabs 标签页" 
					data-page="tabs"
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>
		</DemoPage>	
	)
}

export default IndexPage