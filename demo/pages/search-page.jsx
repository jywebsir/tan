import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Search from '@/components/search'

const SearchPage = () => {
	const [basicValue, setBasicValue] = useState(null)
	const [eventValue, setEventValue] = useState(null)
	const [alignValue, setAlignValue] = useState(null)
	const [bgValue, setBgValue] = useState(null)
	const [customValue, setCustomValue] = useState(null)

	const onChangeBasicValue = useMemoizedFn((value) => {
		setBasicValue(value)
	})

	const onChangeEventValue = useMemoizedFn((value) => {
		setEventValue(value)
	})

	const onChangeAlignValue = useMemoizedFn((value) => {
		setAlignValue(value)
	})

	const onChangeBgValue = useMemoizedFn((value) => {
		setBgValue(value)
	})

	const onChangeCustomValue = useMemoizedFn((value) => {
		setCustomValue(value)
	})

	const onSearch = useMemoizedFn(() => {
		wx.showToast({
			title: `搜索：${eventValue}`,
			icon: 'none',
		})
	})

	const onClear = useMemoizedFn(() => {
		setEventValue(null)

		wx.showToast({
			title: '清空',
			icon: 'none'
		})
	}) 

	const onBlur = useMemoizedFn(() => {
		wx.showToast({
			title: '输入框失去焦点',
			icon: 'none'
		})	
	})

	const onFocus = useMemoizedFn(() => {
		wx.showToast({
			title: '输入框获得焦点',
			icon: 'none'
		})		
	})

	const onCancel = useMemoizedFn(() => {
		setEventValue(null)

		wx.showToast({
			title: '取消',
			icon: 'none'
		})	
	})

	const onCustomSearch = useMemoizedFn(() => {
		wx.showToast({
			title: `搜索：${customValue}`,
			icon: 'none',
		})
	})

	return (
		<DemoPage>
			<DemoBlock title="基本用法">
				<Search 
					placeholder="请输入搜索关键词"
					value={basicValue}
					error
					onChange={onChangeBasicValue}
				/>
			</DemoBlock>

			<DemoBlock title="事件监听">
				<Search 
					value={eventValue}
					placeholder="请输入搜索关键词"
					showAction
					onChange={onChangeEventValue}
					onSearch={onSearch}
					onClear={onClear}
					onCancel={onCancel}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
			</DemoBlock>

			<DemoBlock title="搜索框内容对齐">
				<Search 
					placeholder="请输入搜索关键词"
					inputAlign="center"
					value={alignValue}
					onChange={onChangeAlignValue}
				/>
			</DemoBlock>

			<DemoBlock title="禁用/只读搜索框">
				<Search placeholder="搜索框已禁用" disabled />
				<Search placeholder="搜索框已只读" readonly />
			</DemoBlock>

			<DemoBlock title="圆角搜索框">
				<Search 
					placeholder="请输入搜索关键词" 
					shape="round"
					value={bgValue} 
					onChange={onChangeBgValue}
				/>
			</DemoBlock>

			<DemoBlock title="自定义按钮">
				<Search 
					 label="地址"
					 placeholder="请输入搜索关键词"
					 action={<view onTap={onCustomSearch}>搜索</view>}
					 value={customValue}
					 clearable={false}
					 onChange={onChangeCustomValue}
				/>
			</DemoBlock>
		</DemoPage>
	)
}

export default SearchPage