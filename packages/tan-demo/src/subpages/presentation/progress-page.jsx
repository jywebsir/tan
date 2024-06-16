import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import DemoSpace from '../../components/demo-space'
import Progress from '@/components/progress'
import Button from '@/components/button'

const ProgressPage = props => {
	const [percentage, setPercentage] = useState(0)

	const onIncrease = useMemoizedFn(() => {
		setPercentage((prePercentage) => {
			return prePercentage + 10
		})
	})

	const onDecrease = useMemoizedFn(() => {
		setPercentage((prePercentage) => {
			return prePercentage - 10
		})
	})

	return (
		<DemoPage bgColor="#FFFFFF">
			<DemoBlock title="基础用法" padding>
				<Progress percentage={30} />	
			</DemoBlock>

			<DemoBlock title="置灰" padding>
				<Progress 
					percentage={50}
					inactive 
				/>
			</DemoBlock>

			<DemoBlock title="自定义样式" padding>
				<Progress 
					percentage={55}
					pivotText="紫色渐变"
					style={{
						'--portion-color': 'linear-gradient(to right, #be99ff, #7232dd)',
						'--pivot-background-color': '#7232dd'
					}}
				/>
			</DemoBlock>

			<DemoBlock title="手动控制" padding>
				<Progress percentage={percentage} />	
			</DemoBlock>

			<DemoSpace style={{marginTop: '10px'}}>
				<Button 
					type="primary" 
					disabled={percentage === 100}
					onClick={onIncrease} 
				>增加</Button>

				<Button 
					type="danger" 
					disabled={percentage === 0}
					onClick={onDecrease} 
				>减小</Button>
			</DemoSpace>

		</DemoPage>
	)
}

export default ProgressPage 