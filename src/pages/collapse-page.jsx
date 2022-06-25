import React from 'react'
import { useMemoizedFn } from 'ahooks'
import { useImmer } from 'use-immer'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Collapse from '../tan/components/collapse'
import CollapseItem from '../tan/components/collapse-item'
import Space from '../tan/components/space'
import Icon from '../tan/components/icon'
import style from './collapse-page.module.scss'

const CollapsePage = () => {
	const [active, updateActive] = useImmer({
		first: [1],
		second: null,
		three: []
	})

	const onChangeFirst = useMemoizedFn((value) => {
		updateActive(draft => {
			draft.first = value
		})
	})

	const onChangeSecond = useMemoizedFn((value) => {
		updateActive(draft => {
			draft.second = value
		})
	})

	const onChangeThree = useMemoizedFn((value) => {
		updateActive(draft => {
			draft.three = value
		})
	})

	const customTitle = (
		<Space align="center">
			<view>提供多样店铺模板，快速搭建网上商城</view>
			<Icon name="question-o" className={style.icon} />
		</Space>
	)

	return (
		<DemoPage>
			<DemoBlock title="基础用法" padding>
				<Collapse 
					key="first-collapse" 
					value={active.first} 
					onChange={onChangeFirst}
				>
					<CollapseItem 
						title="标题1"
						name={1}
					>提供多样店铺模板，快速搭建网上商城</CollapseItem>

					<CollapseItem 
						title="标题2"
						name={2}
					>网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失</CollapseItem>

					<CollapseItem 
						title="标题3"
						name={3}
						disabled
					>线上拓客，随时预约，贴心顺手的开单收银</CollapseItem>
				</Collapse>	
			</DemoBlock>

			<DemoBlock title="手风琴" padding>
				<Collapse 
					key="second-collapse" 
					value={active.second} 
					accordion
					onChange={onChangeSecond}
				>	
					<CollapseItem 
						title="标题1"
						name={1}
					>提供多样店铺模板，快速搭建网上商城</CollapseItem>	

					<CollapseItem 
						title="标题2"
						name={2}
					>网店吸粉获客、会员分层营销、一机多种收款，告别经营低效和客户流失</CollapseItem>	
				</Collapse>
			</DemoBlock>

			<DemoBlock title="自定义" padding>
				<Collapse 
					key="three-collapse" 
					value={active.three} 
					onChange={onChangeThree}
				>	
					<CollapseItem 
						title={customTitle}
						name={1}
					>提供多样店铺模板，快速搭建网上商城</CollapseItem>	

					<CollapseItem 
						title="自定义图标"
						icon={<Icon name="success" />}
						value="内容"
						name={2}
					>提供多样店铺模板，快速搭建网上商城</CollapseItem>	
				</Collapse>
			</DemoBlock>
		</DemoPage>
	)
}

export default CollapsePage