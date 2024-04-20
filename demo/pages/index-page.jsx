import React from 'react'
import { useMemoizedFn } from 'ahooks'
import router from '../lib/router'
import {
	buttonPageId,
	cellPageId,
	iconPageId,
	layoutPageId,
	popupPageId,
	imagePageId,
	toastPageId,
	transitionPageId,
} from '../config/pages/basic'

import {
	// calendarPageId,
	fieldPageId,
	radioPageId,
	checkboxPageId,
	switchPageId,
	searchPageId,
	uploaderPageId
} from '../config/pages/form'

import {
	loadingPageId,
	notifyPageId,
	dialogPageId,
	overlayPageId,
	dropdownMenuId,
	pullRefreshPageId
} from '../config/pages/feedback'

import {
	indexBarPageId,
	tabsPageId,
	navBarPageId,
	tabBarPageId
} from '../config/pages/navigation'

import {
	collapsePageId,
	dividerPageId,
	processPageId,
	skeletonPageId,
	countDownPageId,
	emptyPageId,
	stickyPageId
} from '../config/pages/presentation'

import DemoPage from '../components/demo-page'
import CellGroup from '@/components/cell-group'
import Cell from '@/components/cell'

const IndexPage = () => {
	const onClickCell = useMemoizedFn((event) => {
		const { page } = event.currentTarget.dataset

		router.toPage({page})	
	})

	return (
		<DemoPage>
			<CellGroup title="基础组件">
				<Cell 
					title="Button按钮" 
					data-page={buttonPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Cell单元格" 
					data-page={cellPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Icon图标" 
					data-page={iconPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
				
				<Cell 
					title="Layout布局" 
					data-page={layoutPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Popup弹出层" 
					data-page={popupPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Image图片" 
					data-page={imagePageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Toast轻提示" 
					data-page={toastPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="transition动画" 
					data-page={transitionPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="表单组件">
				{/* <Cell 
					title="Calendar日历" 
					data-page={calendarPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/> */}

				<Cell 
					title="Field输入框" 
					data-page={fieldPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Radio单选框" 
					data-page={radioPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Checkbox复选框" 
					data-page={checkboxPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Switch开关" 
					data-page={switchPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Search搜索" 
					data-page={searchPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Uploader文件上传" 
					data-page={uploaderPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="反馈组件">
				<Cell 
					title="Dialog弹出框" 
					data-page={dialogPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Loading加载" 
					data-page={loadingPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Notify消息通知" 
					data-page={notifyPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Overlay遮罩层" 
					data-page={overlayPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="DropdownMenu 下拉菜单" 
					data-page={dropdownMenuId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="PullRefresh 下拉刷新" 
					data-page={pullRefreshPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="展示组件">
				<Cell 
					title="Collapse折叠面板" 
					data-page={collapsePageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Divider分割线" 
					data-page={dividerPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Progress进度条" 
					data-page={processPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Skeleton骨架屏" 
					data-page={skeletonPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="CountDown倒计时" 
					data-page={countDownPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Empty空状态" 
					data-page={emptyPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Sticky粘性布局" 
					data-page={stickyPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>

			<CellGroup title="导航组件">
				<Cell 
					title="NavBar 导航栏" 
					data-page={navBarPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Tabbar 标签栏" 
					data-page={tabBarPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="IndexBar 索引栏" 
					data-page={indexBarPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>

				<Cell 
					title="Tabs 标签页" 
					data-page={tabsPageId}
					rightIcon
					clickable
					onClick={onClickCell}	
				/>
			</CellGroup>
		</DemoPage>	
	)
}

export default IndexPage