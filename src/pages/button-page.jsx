import React from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Button from '../tan/components/button'
import Row from '../tan/components/row'
import Col from '../tan/components/col'
import Space from '../tan/components/space'

const ButtonPage = () => {
	return (
		<DemoPage>
			<DemoBlock 
				title="按钮类型" 
				padding
			>
				<Row justify="between" align="stretch">
					<Col span="6">
						<Button>默认按钮</Button>
					</Col>

					<Col span="6">
						<Button type="primary">主要按钮</Button>
					</Col>

					<Col span="6">
						<Button type="info">信息按钮</Button>
					</Col>

					<Col span="6">
						<Button type="danger">危险按钮</Button>
					</Col>
				</Row>
			</DemoBlock>

			<DemoBlock 
				title="朴素按钮" 
				padding
			>
				<Row justify="start">
					<Col span="6">
						<Button type="primary" plain>朴素按钮</Button>	
					</Col>		

					<Col span="6">
						<Button type="info" plain>朴素按钮</Button>	
					</Col>
				</Row>
			</DemoBlock>	

			<DemoBlock 
				title="细边框" 
				padding
			>
				<Row justify="start">
					<Col span="7">
						<Button type="primary" plain hairline>细边框按钮</Button>		
					</Col>

					<Col span="7">
						<Button type="info" plain hairline>细边框按钮</Button>	
					</Col>
				</Row>
			</DemoBlock>		

			<DemoBlock 
				title="禁用状态" 
				padding
			>
				<Row> 
					<Col span="6">
						<Button type="primary" disabled>禁用状态</Button>	
					</Col>	

					<Col span="6">
						<Button type="info" disabled>禁用状态</Button>	
					</Col>
				</Row>	
			</DemoBlock>		

			<DemoBlock 
				title="加载状态" 
				padding
			>
				<Row justify="start">
					<Col span="5">
						<Button type="primary" loading />
					</Col>

					<Col span="5">
						<Button type="primary" loadingType="spinner" loading />
					</Col>

					<Col span="8">
						<Button type="primary" loadingText="加载中..." loading />
					</Col>
				</Row>
			</DemoBlock>		

			<DemoBlock 
				title="按钮形状" 
				padding
			>
				<Col span="6">
					<Button type="primary" square>方形按钮</Button>
				</Col>

				<Col span="6">
					<Button type="info" round>圆形按钮</Button>
				</Col>
			</DemoBlock>

			<DemoBlock 
				title="按钮尺寸" 
				padding
			>
				<Button type="primary" size="large" block>大号按钮</Button>

				<Space>
					<Button type="primary">普通按钮</Button>
					<Button type="primary" size="small">小号按钮</Button>
					<Button type="primary" size="mini">迷你按钮</Button>
				</Space>
			</DemoBlock>
		</DemoPage>
	)
}

export default ButtonPage 