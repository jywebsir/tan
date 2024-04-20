import React, { useState } from 'react'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Cell from '@/components/cell'
import Popup from '@/components/popup'
import style from '../../styles/popup-page.module.scss'

const PopupPage = () => {
	const [showBasic, setShowBasic] = useState(false)
	const [showTop, setShowTop] = useState(false)
	const [showBottom, setShowBottom] = useState(false)
	const [showLeft, setShowLeft] = useState(false)
	const [showRight, setShowRight] = useState(false)
	const [showCloseIcon, setShowCloseIcon] = useState(false)
	const [showCustomCloseIcon, setShowCustomCloseIcon] = useState(false)
	const [showCloseIconPosition, setShowCloseIconPosition] = useState(false)
	const [showRound, setShowRound] = useState(false)

	const onShowBasic = () => {
		setShowBasic(true)
	}

	const onHideBasic = () => {
		setShowBasic(false)
	}

	const onShowTop = () => {
		setShowTop(true)
	}

	const onHideTop = () => {
		setShowTop(false)
	}

	const onShowBottom = () => {
		setShowBottom(true)
	}

	const onHideBottom = () => {
		setShowBottom(false)
	}

	const onShowLeft = () => {
		setShowLeft(true)
	}

	const onHideLeft = () => {
		setShowLeft(false)
	}

	const onShowRight = () => {
		setShowRight(true)
	}

	const onHideRight = () => {
		setShowRight(false)
	}

	const onShowCloseIcon = () => {
		setShowCloseIcon(true)
	}

	const onHideCloseIcon = () => {
		setShowCloseIcon(false)
	}

	const onShowCustomCloseIcon = () => {
		setShowCustomCloseIcon(true)
	}

	const onHideCustomCloseIcon = () => {
		setShowCustomCloseIcon(false)
	}

	const onShowCloseIconPosition = () => {
		setShowCloseIconPosition(true)	
	}

	const onHideCloseIconPosition = () => {
		setShowCloseIconPosition(false)	
	}

	const onShowRound = () => {
		setShowRound(true)
	}

	const onHideRound = () => {
		setShowRound(false)
	}

	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<Cell 
					title="展示弹出层" 
					rightIcon
					clickable 
					onClick={onShowBasic} 
				/>

				<Popup 
					key="basic"
					transition="scale"
					show={showBasic} 
					className={style.basic}
					onClose={onHideBasic}
				>
					<view>内容</view>
				</Popup>
			</DemoBlock>	

			<DemoBlock title="弹出位置">
				<Cell 
					title="顶部弹出" 
					rightIcon
					clickable 
					onClick={onShowTop} 
				/>	

				<Cell 
					title="底部弹出" 
					rightIcon
					clickable 
					onClick={onShowBottom} 
				/>	

				<Cell 
					title="左侧弹出" 
					rightIcon
					clickable 
					onClick={onShowLeft} 
				/>	

				<Cell 
					title="右侧弹出" 
					rightIcon
					clickable 
					onClick={onShowRight} 
				/>	

				<Popup 
					key="top"
					position="top"
					show={showTop} 
					className={style.top}
					onClose={onHideTop}
				/>

				<Popup 
					key="bottom"
					position="bottom"
					show={showBottom} 
					className={style.bottom}
					onClose={onHideBottom}
				/>


				<Popup 
					key="left"
					position="left"
					show={showLeft} 
					className={style.left}
					onClose={onHideLeft}
				/>

				<Popup 
					key="right"
					position="right"
					show={showRight} 
					className={style.right}
					onClose={onHideRight}
				/>
			</DemoBlock>

			<DemoBlock title="关闭图标">
				<Cell 
					title="关闭图标" 
					rightIcon
					clickable 	
					onClick={onShowCloseIcon}
				/>

				<Cell 
					title="自定义关闭图标" 
					rightIcon
					clickable 	
					onClick={onShowCustomCloseIcon}
				/>

				<Cell 
					title="图标位置" 
					rightIcon
					clickable 	
					onClick={onShowCloseIconPosition}
				/>

				<Popup 
					key="close"
					position="bottom"
					show={showCloseIcon} 
					className={style.close}
					closeable
					onClose={onHideCloseIcon}
				/>	

				<Popup 
					key="custom-close"
					position="bottom"
					show={showCustomCloseIcon} 
					className={style.close}
					closeable
					onClose={onHideCustomCloseIcon}
				/>	

				<Popup 
					key="icon-position"
					position="bottom"
					closeIconPosition="top-left"	
					show={showCloseIconPosition} 
					className={style.close}
					closeable
					onClose={onHideCloseIconPosition}
				/>	
			</DemoBlock>

			<DemoBlock title="圆角弹窗">
				<Cell 
					title="圆角弹窗" 
					rightIcon
					clickable 	
					onClick={onShowRound}
				/>	

				<Popup 
					key="round"
					position="bottom"
					show={showRound} 
					className={style.round}
					round
					onClose={onHideRound}
				/>		
			</DemoBlock>
		</DemoPage>
	)	
}

export default PopupPage