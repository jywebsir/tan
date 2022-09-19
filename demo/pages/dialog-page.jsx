import React from 'react'
import { useMemoizedFn } from 'ahooks'
import { useImmer } from 'use-immer'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Cell from '@/components/cell'
import Dialog from '@/components/dialog'
import style from '../styles/dialog-page.module.scss'

const message = '代码是写出来给人看的，附带能在机器上运行'

const DialogPage = () => {
	const [showDialog, updateShowDialog] = useImmer({
		first: false,
		second: false,
		third: false,
		fifth: false
	})

	const onClick = useMemoizedFn((event) => {
		const { dataset: {dlg} } = event.currentTarget

		updateShowDialog(draft => {
			draft[dlg] = true
		})
	})

	const onBeforeClose = useMemoizedFn((action) => {
		console.log(`onBeforeClose: ${action}`)

		return new Promise((resovle) => {
			setTimeout(() => {
				resovle(true)	
			}, 2000)
		})
	})

	const onClose = useMemoizedFn((action) => {
		console.log(`onClose: ${action}`)

		updateShowDialog(draft => {
			draft.first = false
			draft.second = false
			draft.third = false
			draft.fourth = false
			draft.fifth = false
		})	
	})


	return (
		<DemoPage>
			<DemoBlock title="提示弹窗" card padding>
				<Cell 
					title="提示弹窗" 
					data-dlg="first"
					clickable 
					rightIcon 
					onClick={onClick}
				/>

				<Cell 
					title="提示弹窗（无标题）" 
					data-dlg="second"
					clickable 
					rightIcon 
					onClick={onClick}
				/>

				<Cell 
					title="确认弹窗" 
					data-dlg="third"
					clickable 
					rightIcon 
					onClick={onClick}
				/>
			</DemoBlock>

			<DemoBlock title="异步关闭" card padding>
				<Cell 
					title="异步关闭" 
					data-dlg="fourth"
					clickable 
					rightIcon 
					onClick={onClick}
				/>	
			</DemoBlock>

			<DemoBlock title="自定义内容" card padding>
				<Cell 
					title="自定义内容" 
					data-dlg="fifth"
					clickable 
					rightIcon 
					onClick={onClick}
				/>	
			</DemoBlock>

			<Dialog 
				key="first"
				title="标题"
				show={showDialog.first}
				message={message}
				showConfirmButton
				onClose={onClose}
			/>

			<Dialog 
				key="second"
				show={showDialog.second}
				message={message}
				showConfirmButton
				onClose={onClose}
			/>

			<Dialog 
				key="third"
				show={showDialog.third}
				message={message}
				showCancelButton
				showConfirmButton
				onClose={onClose}
			/>

			<Dialog 
				key="fourth"
				show={showDialog.fourth}
				title="异步关闭"
				message={message}
				showCancelButton
				showConfirmButton
				onBeforeClose={onBeforeClose}
				onClose={onClose}
			/>

			<Dialog 
				key="fifth"
				show={showDialog.fifth}
				showCancelButton
				showConfirmButton
				onClose={onClose}
			>
				<image
					className={style.image}
					src="https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg"
				/>
			</Dialog>
		</DemoPage>
	)
}

export default DialogPage