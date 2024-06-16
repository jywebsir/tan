import React from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Carousel from '@/components/carousel'
import Space from '@/components/space'

const ButtonPage = () => {
	return (
		<DemoPage>
			<DemoBlock 
				title="幻灯片默认" 
				padding
			>
				<Carousel 
					images={[
						'https://apex-platform-test2.oss-cn-shanghai.aliyuncs.com/upload/test/d5f69d7d-56bd-4744-bb60-43baea480ee5.jpeg?x-oss-process=image/resize,w_750,w_750,m_fill',
						'https://apex-platform-test2.oss-cn-shanghai.aliyuncs.com/upload/test/af7cf073-08af-4191-9043-5ee4773a94cd.jpg?x-oss-process=image/resize,w_750,w_750,m_fill'
					]}	
					showIndicator
				/>
			</DemoBlock>
		</DemoPage>
	)
}

export default ButtonPage 