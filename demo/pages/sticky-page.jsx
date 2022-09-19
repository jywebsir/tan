import React, { useState } from 'react'
import { useMemoizedFn, useMount } from 'ahooks'
import { getRect, getNode } from '@/utils/helpers'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Sticky from '@/components/sticky'
import Button from '@/components/button'
import style from '../styles/sticky-page.module.scss'

const StickyPage = () => {
	const [scrollTop, setScrollTop] = useState(0)
	const [offsetTop, setOffsetTop] = useState(0)

	const onScroll = useMemoizedFn((event) => {
		getRect('#sticker-demo-scroller').then((rect) => {
			setScrollTop(event.detail.scrollTop)
			setOffsetTop(rect.top)
		})
	})

	const getContainer = useMemoizedFn(() => {
		return getNode('#container')
	})

	return (
		<DemoPage className={style.container}>
			<DemoBlock title="基础用法">
				<Sticky>
					<Button type="primary" className={style.button}>基础用法</Button>
				</Sticky>
			</DemoBlock>

			<DemoBlock title="吸顶距离">
				<Sticky offsetTop={50}>
					<Button type="primary" className={style.button2}>吸顶距离</Button>	
				</Sticky>
			</DemoBlock>

			
			<DemoBlock title="指定容器">
				<view id="container" className={style.inContainer}>
					<Sticky container={getContainer}>
						<Button type="primary" className={style.button}>指定容器</Button>
					</Sticky>
				</view>
			</DemoBlock>

			<DemoBlock title="嵌套在scroll-view内使用">
				<scroll-view
					onScroll={onScroll}
					scroll-y
					id="sticker-demo-scroller"
					catchMove
					className={style.scroller}
				>
					<view className={style.scrollerContent}>
						<Sticky offsetTop={offsetTop} scrollTop={scrollTop}>
							<Button type="primary" className={style.button}>嵌套用法</Button>	
						</Sticky>	
					</view>
				</scroll-view>
			</DemoBlock>
		</DemoPage>
	)
}

export default StickyPage 