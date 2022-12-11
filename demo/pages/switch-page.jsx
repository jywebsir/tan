import React, { useState } from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Switch from '@/components/switch'
import style from '../styles/switch-page.module.scss'

const SwitchPage = () => {
	const [secondValue, setSecondValue] = useState(false)

	const onChangeFirstValue = (value) => {
		console.log(value)
	}

	const onChangeSecondValue = (value) => {
		setSecondValue(value)
	}

	return (
		<DemoPage className={style.container}>
			<DemoBlock title="基础用法 - 非受控" padding>
				<Switch onChange={onChangeFirstValue} />
			</DemoBlock>

			<DemoBlock title="基础用法 - 受控" padding>
				<Switch value={secondValue} onChange={onChangeSecondValue} />
			</DemoBlock>

			<DemoBlock title="默认开启" padding>
				<Switch defaultValue={true} />
			</DemoBlock>

			<DemoBlock title="禁用状态" padding>
				<Switch disabled />
			</DemoBlock>

			<DemoBlock title="加载状态" padding>
				<Switch defaultValue={true} loading />
			</DemoBlock>

			<DemoBlock title="自定义加载状态颜色" padding>
				<Switch defaultValue={true} className={style.customLoadingColor} loading />
			</DemoBlock>

			<DemoBlock title="自定义大小" padding>
				<Switch className={style.customSize} />
			</DemoBlock>

			<DemoBlock title="自定义颜色" padding>
				<Switch className={style.customColor} />
			</DemoBlock>
		</DemoPage>
	)
}

export default SwitchPage