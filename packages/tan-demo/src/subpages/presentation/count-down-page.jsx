import React, { useState, useRef } from 'react'
import Taro from '@tarojs/taro'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import DemoSpace from '../../components/demo-space'
import Button from '@/components/button'
import CountDown from '@/components/count-down'
import style from '../../styles/count-down-page.module.scss'

const CountDownPage = props => {
	const ref = useRef()

	const [time, setTime] = useState(30 * 60 * 60 * 1000)
	const [timeData, setTimeData] = useState(null)

	const onChangeTimeData = useMemoizedFn((data) => {
		setTimeData(data)
	})

	const onFinish = useMemoizedFn(() => {
		Taro.showToast({
			title: '倒计时已完成',
			duration: 2000
		})
	})

	const onStart = useMemoizedFn(() => {
		ref.current.start()
	})

	const onPause = useMemoizedFn(() => {
		ref.current.pause()
	})

	const onReset = useMemoizedFn(() => {
		ref.current.reset()
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法" padding>
				<CountDown time={time} />	
			</DemoBlock>

			<DemoBlock title="自定义格式" padding>
				<CountDown time={time} format="DD 天 HH 时 mm 分 ss 秒" />	
			</DemoBlock>

			<DemoBlock title="毫秒级渲染" padding>
				<CountDown time={time} format="HH:mm:ss:SSS" millisecond />	
			</DemoBlock>

			<DemoBlock title="自定义样式" padding>
				<CountDown time={time} onChange={onChangeTimeData}>
					{
						timeData
						&&
						<>
							<text key="hours" className={style.item}>{timeData.days * 24 + timeData.hours}</text>
							<text key="minutes" className={style.item}>{timeData.minutes}</text>
							<text key="seconds" className={style.item}>{timeData.seconds}</text>
						</>
					}
				</CountDown>	
			</DemoBlock>

			<DemoBlock title="手动控制" padding>
				<CountDown 
					ref={ref}
					time={10000}
					autoStart={false}
					format="HH:mm:ss"
					onFinish={onFinish}
				/>

				<DemoSpace className={style.manuleActions}>
					<Button type="primary" onClick={onStart}>开始</Button>
					<Button type="danger" onClick={onPause}>暂停</Button>
					<Button onClick={onReset}>重置</Button>
				</DemoSpace>
			</DemoBlock>
		</DemoPage>
	)
}

export default CountDownPage