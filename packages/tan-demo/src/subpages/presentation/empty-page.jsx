import React, { useState } from 'react'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Empty from '@/components/empty'
import Button from '@/components/button'
import style from '../../styles/empty-page.module.scss'

const EmptyPage = () => {
	return (
		<DemoPage className={style.page}>
			<DemoBlock 
				title="基础用法" 
				padding
			>
				<Empty description="描述文字" />
			</DemoBlock>

			<DemoBlock title="图片类型">
				<Empty image="error" description="通用错误" />
				<Empty image="network" description="网络错误" />
				<Empty image="search" description="搜索提示" />
			</DemoBlock>

			<DemoBlock title="自定义图片" padding>
				<Empty 
					image="https://img.yzcdn.cn/vant/custom-empty-image.png" 
					description="描述文字" 
					className={style.customImage}
				/>
			</DemoBlock>

			<DemoBlock title="底部内容" padding>
				<Empty description="描述文字">
					<Button 
						type="danger" 
						className={style.btnBottom} 
						round
					>底部按钮</Button>
				</Empty>
			</DemoBlock>
		</DemoPage>
	)
}

export default EmptyPage 