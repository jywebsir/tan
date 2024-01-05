import React from 'react'
import { useMemoizedFn } from 'ahooks'
import { getDataSet } from '@/utils/event'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Button from '@/components/button'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import Notify from '@/components/notify'

const NotifyPage = () => {
	const onShowBasic = useMemoizedFn(() => {
		Notify.open({
			message: '通知内容'
		})
	})

	const onShowByType = useMemoizedFn((event) => {
		const { type } = getDataSet(event)

		Notify.open({
			type,
			message: '通知内容',
		})	
	})

	const onShowSafe = useMemoizedFn(() => {
		Notify.open({
			safeAreaInsetTop: true,
			message: '通知内容'
		})		
	})

	const onShowByCustomColor = useMemoizedFn(() => {
		Notify.open({
			color: '#ad0000',
			background: '#ffe1e1',
			message: '自定义颜色'
		})		
	})

	const onShowByCustomDuration = useMemoizedFn(() => {
		Notify.open({
			message: '自定义时长1秒',
			duration: 1000
		})		
	})

	return (
		<DemoPage>
			<DemoBlock 
				title="基础用法" 
				padding
			>
				<Cell 
					title="基础用法" 
					rightIcon
					onClick={onShowBasic}
				/>
			</DemoBlock>

			<DemoBlock 
				title="通知类型" 
				padding
			>
				<CellGroup>
					<Cell 
						title="主要通知" 
						data-type="primary"
						rightIcon
						onClick={onShowByType}
					/>

					<Cell 
						title="成功通知" 
						data-type="success"
						rightIcon
						onClick={onShowByType}
					/>

					<Cell 
						title="警告通知" 
						data-type="warning"
						rightIcon
						onClick={onShowByType}
					/>

					<Cell 
						title="危险通知" 
						data-type="danger"
						rightIcon
						onClick={onShowByType}
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="自定义通知" padding>
				<CellGroup>
					<Cell 
						title="自定义颜色" 
						rightIcon
						onClick={onShowByCustomColor} 
					/>

					<Cell 
						title="自定义时长" 
						rightIcon
						onClick={onShowByCustomDuration} 
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock 
				title="插入状态栏高度" 
				padding
			>
				<Cell 
					title="插入状态栏高度" 
					rightIcon
					onClick={onShowSafe}
				/>	
			</DemoBlock>

			<Notify />
		</DemoPage>
	)
}

export default NotifyPage 