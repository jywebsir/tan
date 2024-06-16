import React, { useState } from 'react'
import classNames from 'classnames'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Cell from '@/components/cell'
import Transition from '@/components/transition'
import style from '../styles/transition-page.module.scss'

const TransitionPage = () => {
	const [show, setShow] = useState(false)
	const [name, setName] = useState('fade')
	const [showCustom, setShowCustom] = useState(false)

	const trigger = useMemoizedFn((name) => {
		setName(name)
		setShow(true)

		setTimeout(() => {
			setShow(false)
		}, 1000)
	})


	const onclick = useMemoizedFn((event) => {
		const { currentTarget } = event

		if (currentTarget.dataset && currentTarget.dataset.name) {
			trigger(currentTarget.dataset.name)
		}
	})

	const onClickCustom = useMemoizedFn(() => {
		setShowCustom(true)

		setTimeout(() => {
			setShowCustom(false)
		}, 1000)
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法" padding>
				<Cell 
					title="Fade" 
					data-name="fade"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Fade Up" 
					data-name="fade-up"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Fade Down" 
					data-name="fade-down"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Fade Left" 
					data-name="fade-left"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Fade Right" 
					data-name="fade-right"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Slide Up" 
					data-name="slide-up"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Slide Down" 
					data-name="slide-down"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Slide Left" 
					data-name="slide-left"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Slide Right" 
					data-name="slide-right"
					rightIcon 
					clickable 
					onClick={onclick} 
				/>

				<Cell 
					title="Custom" 
					rightIcon 
					clickable 
					onClick={onClickCustom} 
				/>

				<Transition 
					name={name} 
					show={show} 
					className={style.block}
				/>

				<Transition 
					name=""
					show={showCustom} 
					duration={{
						enter: 300,
						leave: 1000
					}}
					className={style.block}
					enterClass={style.enterClass}
					enterActiveClass={style.enterActiveClass}
					leaveActiveClass={style.leaveActiveClass}
					leaveToClass={style.leaveToClass}
				/>
			</DemoBlock>
		</DemoPage>
	)
}

export default TransitionPage 