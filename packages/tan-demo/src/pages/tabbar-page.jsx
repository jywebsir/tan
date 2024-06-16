import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { useImmer } from 'use-immer'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Tabbar from '@/components/tabbar'
import TabbarItem  from '@/components/tabbar-item'

const icons = {
	normal: 'https://img.yzcdn.cn/vant/user-inactive.png',
	active: 'https://img.yzcdn.cn/vant/user-active.png'
}

const TabbarPage = () => {
	const [activeValues, updateActiveValues] = useImmer({
		active: 0,
		active2: 'search',
		active3: 0,
		active4: 0,
		active5: 0,
		active6: 0
	})

	const onChange = useMemoizedFn((event) => {
		const { key } = event.currentTarget.dataset

		updateActiveValues(draft => {
			draft[key] = event.detail
		})
	})

	const onClickItem = useMemoizedFn((event) => {
		wx.showToast({ title: `点击标签 ${event.detail + 1}`, icon: 'none' });
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<Tabbar 
					data-key="active"
					active={activeValues.active} 
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem icon="home-o">标签</TabbarItem>	
					<TabbarItem icon="search">标签</TabbarItem>	
					<TabbarItem icon="friends-o">标签</TabbarItem>	
					<TabbarItem icon="setting-o">标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>

			<DemoBlock title="通过名称匹配">
				<Tabbar 
					data-key="active2"
					active={activeValues.active2}
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem name="home" icon="home-o">标签</TabbarItem>	
					<TabbarItem name="search" icon="search">标签</TabbarItem>	
					<TabbarItem name="firends" icon="friends-o">标签</TabbarItem>	
					<TabbarItem name="setting" icon="setting-o">标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>

			<DemoBlock title="显示徽标">
				<Tabbar 
					data-key="active3"
					active={activeValues.active3}
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem icon="home-o">标签</TabbarItem>	
					<TabbarItem icon="search" dot>标签</TabbarItem>	
					<TabbarItem icon="friends-o" info="5">标签</TabbarItem>	
					<TabbarItem icon="setting-o" info="20">标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>

			<DemoBlock title="自定义图标">
				<Tabbar 
					data-key="active4"
					active={activeValues.active4}
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem 
						info="3"
						icon={
							<image 
								src={icons.normal} 
								mode="aspectFit" 
								style={{width: '20px', height: '12px'}}
							/>
						}
						iconActive={
							<image 
								src={icons.active} 
								mode="aspectFit" 
								style={{width: '20px', height: '12px'}}
							/>
						}
					>
						自定义
					</TabbarItem>

					<TabbarItem icon="search" dot>标签</TabbarItem>	
					<TabbarItem icon="friends-o" info="5">标签</TabbarItem>	
					<TabbarItem icon="setting-o" info="20">标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>

			<DemoBlock title="自定义颜色">
				<Tabbar
					data-key="active5"
					activeColor="#07c160"
					inactiveColor="#000"
					active={activeValues.active5}
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem icon="home-o">标签</TabbarItem>	
					<TabbarItem icon="search">标签</TabbarItem>	
					<TabbarItem icon="friends-o">标签</TabbarItem>	
					<TabbarItem icon="setting-o">标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>

			<DemoBlock title="点击tab item事件">
				<Tabbar
					data-key="active6"
					active={activeValues.active6}
					safeAreaInsetBottom={false}
					fixed={false}
					onChange={onChange}
				>
					<TabbarItem icon="home-o" onClick={onClickItem}>标签</TabbarItem>	
					<TabbarItem icon="search" onClick={onClickItem}>标签</TabbarItem>	
					<TabbarItem icon="friends-o" onClick={onClickItem}>标签</TabbarItem>	
					<TabbarItem icon="setting-o" onClick={onClickItem}>标签</TabbarItem>	
				</Tabbar>
			</DemoBlock>
		</DemoPage>
	)
}

export default TabbarPage 