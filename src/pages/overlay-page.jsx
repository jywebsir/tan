import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Button from '../tan/components/button'
import Overlay from '../tan/components/overlay'
import style from './overlay-page.module.scss'

const OverlayPage = () => {
	const [show, setShow] = useState(false)
	const [showEmbedded, setShowEmbedded] = useState(false)

	const onClickShow = useMemoizedFn(() => {
		setShow(true)	
	})

	const onClickHide = useMemoizedFn(() => {
		setShow(false)
	})

	const onClickShowEmbedded = useMemoizedFn(() => {
		setShowEmbedded(true)
	})

	const onClickHideEmbedded = useMemoizedFn(() => {
		setShowEmbedded(false)
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法" padding>
				<Button type="primary" onClick={onClickShow}>显示遮罩层</Button>

				<Overlay show={show} onClick={onClickHide} />
			</DemoBlock>	

			<DemoBlock title="嵌入内容" padding>
				<Button type="primary" onClick={onClickShowEmbedded}>嵌入内容</Button>

				<Overlay show={showEmbedded} onClick={onClickHideEmbedded}>
					<view className={style.wrapper} catchMove>
						<view className={style.block} />
					</view>
				</Overlay>
			</DemoBlock>
		</DemoPage>
	)	
}

export default OverlayPage