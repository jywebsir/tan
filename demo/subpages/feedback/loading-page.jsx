import React from 'react'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Loading from '@/components/loading'

const LoadingPage = () => {
	return (
		<DemoPage style={{backgroundColor: '#FFFFFF'}}>
			<DemoBlock 
				title="加载类型" 
				padding
			>
				<Loading />	
				<Loading type="spinner" />	
			</DemoBlock>

			<DemoBlock title="自定义颜色" padding>
				<Loading style={{'--loading-spinner-color': '#1989fa'}} />	
				<Loading type="spinner" style={{'--loading-spinner-color': '#1989fa'}} />	
			</DemoBlock>

			<DemoBlock title="加载文案" padding>
				<Loading>加载中...</Loading>	
			</DemoBlock>

			<DemoBlock title="垂直排列" padding>
				<Loading vertical>加载中...</Loading>	
			</DemoBlock>
		</DemoPage>
	)
}

export default LoadingPage 