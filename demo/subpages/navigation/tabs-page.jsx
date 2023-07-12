import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Tabs from '@/components/tabs'
import Icon from '@/components/icon'
import style from './tabs-page.module.scss'

const tabs3 = [1, 2, 3]
const tabs4 = [1, 2, 3, 4]
const tabsWithValue = ['a', 'b', 'c', 'd']
const tabs6 = [1, 2, 3, 4, 5, 6]

const TabsPage = () => {
	const onClickDisabled = useMemoizedFn((event) => {
		Taro.showToast({
			title: `标签 ${event.index + 1} 已被禁用`,
			icon: 'none',
		})
	})

	const onBeforeChange = useMemoizedFn(({
		title
	}) => {
		return new Promise((resolve, reject) => {
			wx.showModal({
				title: '异步切换',
				content: `确定要切换至 ${title} tab吗？`,
				success: (res) => {
					if (res.confirm) {
						resolve()
					} else if (res.cancel) {
						reject()
					}
				},
			})
		})
	})

	const onChange = useMemoizedFn((value) => {
		Taro.showToast({
			title: `切换到标签 ${value+ 1}`,
			icon: 'none',
		})	
	})

	const onChangeByValue = useMemoizedFn((value) => {
		Taro.showToast({
			title: `切换到标签 ${value}`,
			icon: 'none',
		})	
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<Tabs onChange={onChange}>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab title={`标签${tab}`} key={index}>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="通过值匹配">
				<Tabs defaultValue="b" onChange={onChangeByValue}>
					{
						tabsWithValue.map((tab, index) => {
							return (
								<Tabs.Tab value={tab} title={`标签${tab}`} key={index}>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="横向滚动">
				<Tabs>
					{
						tabs6.map((tab, index) => {
							return (
								<Tabs.Tab title={`标签${tab}`} key={index}>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="粘性布局">
				<Tabs sticky>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="禁用标签">
				<Tabs onClickDisabled={onClickDisabled}>
					{
						tabs3.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
									disabled={index === 1}
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="样式风格">
				<Tabs type="card">
					{
						tabs3.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
								>
									<view className={style.content2}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="自定义标题">
				<Tabs navRight={<Icon name="search" className={style.navRight}/>}>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
									dot={ index === 1}
									info={ index === 2 ? 99 : null}
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="切换动画">
				<Tabs animated>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="滑动切换">
				<Tabs swipeable animated>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>

			<DemoBlock title="异步切换">
				<Tabs onBeforeChange={onBeforeChange} onChange={onChange}>
					{
						tabs4.map((tab, index) => {
							return (
								<Tabs.Tab 
									title={`标签${tab}`} 
									key={index} 
								>
									<view className={style.content}>
										内容{tab}
									</view>
								</Tabs.Tab>	
							)
						})
					}
				</Tabs>
			</DemoBlock>
		</DemoPage>
	)
}

export default TabsPage