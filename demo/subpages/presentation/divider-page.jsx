import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import DemoSpace from '../../components/demo-space'
import Divider from '@/components/divider'

const DividerPage = props => {
	return (
		<DemoPage bgColor="#FFFFFF">
			<DemoBlock title="基础用法" padding>
				<Divider />	
			</DemoBlock>

			<DemoBlock title="内容位置" padding>
				<Divider contentPosition="center">文本</Divider>	
				<Divider contentPosition="left">文本</Divider>	
				<Divider contentPosition="right">文本</Divider>	
			</DemoBlock>

			<DemoBlock title="虚线" padding>
				<Divider dashed />
			</DemoBlock>	

			<DemoBlock title="自定义样式" padding>
				<Divider 
					contentPosition="center" 
					style={{
						'--text-color': '#1989fa',
						'--border-color': '#1989fa',
						'--font-size': '18px'
					}}
				>文本</Divider>
			</DemoBlock>	
		</DemoPage>
	)
}

export default DividerPage 