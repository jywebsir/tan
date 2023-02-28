import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Skeleton from '@/components/skeleton'
import Switch from '@/components/switch'
import style from '../styles/skeleton-page.module.scss'

const SkeletonPage = () => {
	const [show, setShow] = useState(false)

	const onChangeShow = useMemoizedFn((value) => {
		setShow(value)
	})

	return (
		<DemoPage bgColor="#FFFFFF">
			<DemoBlock title="行用法">
				<Skeleton 
					row={3} 
					className={style.basicSkeleton} 
					title 
				/>
			</DemoBlock>

			<DemoBlock title="列用法">
				<Skeleton 
					direction="col"
					col={3} 
					title
				/>
			</DemoBlock>

			<DemoBlock title="显示头像">
				<Skeleton 
					row={3} 
					avatar
					title 
				/>	
			</DemoBlock>


			<DemoBlock title="展示子组件">
				<Switch 
					checked={show}
					className={style.switch}
					onChange={onChangeShow}
				/>

				<Skeleton 
					row={3} 
					loading={!show}
					avatar
					title 
				>	
					<view className={style.childContent}>子组件内容</view>
				</Skeleton>
			</DemoBlock>
		</DemoPage>
	)
}

export default SkeletonPage 