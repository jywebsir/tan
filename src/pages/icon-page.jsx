import React from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Space from '@/tan/components/space'
import Icon from '@/tan/components/icon'
import style from '../styles/icon-page.module.scss'

const IconPage = () => {
	return (
		<DemoPage className={style.container}>
			<DemoBlock title="基础用法">
				<Space wrap>
					<Space direction="vertical" align="center">
						<Icon 
							name="arrow" 
						/>

						<text>arrow</text>
					</Space>

					<Space direction="vertical" align="center">
						<Icon 
							name="arrow-left" 
						/>
						<text>arrow-left</text>
					</Space>


					<Space direction="vertical" align="center">
						<Icon 
							name="arrow-up" 
						/>
						<text>arrow-up</text>
					</Space>


					<Space direction="vertical" align="center">
						<Icon 
							name="arrow-down" 
						/>
						<text>arrow-down</text>
					</Space>
        </Space>
			</DemoBlock>

			<DemoBlock title="提示信息">
				<Space wrap>
					<Icon 
						name="user-circle-o" 
						dot
					/>

					<Icon 
						name="user-circle-o" 
						info="9"
					/>
				</Space>
			</DemoBlock>

			<DemoBlock title="图标颜色">
				<Space wrap>
					<Icon 
						name="bag-o" 
					/>

					<Icon 
						name="bag-o" 
						style={{
							'--color': '#1989fa'
						}}
					/>
				</Space>
			</DemoBlock>
		</DemoPage>
	)	
}

export default IconPage 