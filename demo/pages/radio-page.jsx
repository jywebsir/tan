import React, { useState } from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Icon from '@/components/icon'
import Radio from '@/components/radio'
import RadioGroup from '@/components/radio-group'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import style from '../styles/radio-page.module.scss'

const ICONS = {
	inactived: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
	actived: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
}

const RadioPage = () => {
	const [radio1, setRadio1] = useState('1')
	const [radio2, setRadio2] = useState('2')
	const [radioIcon, setRadioIcon] = useState('1')
	const [radioShape, setRadioShape] = useState('1')
	const [radioLabelDisabled, setRadioLabelDisabled] = useState('1')
	const [radio3, setRadio3] = useState('1')

	const onChangeRadio1 = (name) => {
		setRadio1(name)
	}

	const onChangeRadio2 = (name) => {
		setRadio2(name)
	}

	const onChangeRadioShape = (name) => {
		setRadioShape(name)
	}

	const onChangeRadioIcon = (name) => {
		setRadioIcon(name)
	}

	const onChangeRadioLabelDisabled = (name) => {
		setRadioLabelDisabled(name)
	}

	const onClickCell = (event) => {
		const { name } = event.currentTarget.dataset

		setRadio3(name)
	}

	return (
		<DemoPage className={style.container}>
			<DemoBlock title="基础用法" padding>
				<RadioGroup value={radio1} onChange={onChangeRadio1}>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="水平排列" padding>
				<RadioGroup direction="horizontal" value={radio2} onChange={onChangeRadio2}>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="禁用状态" padding>
				<RadioGroup value="1" disabled>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="自定义形状" padding>
				<RadioGroup shape="square" value={radioShape} onChange={onChangeRadioShape}>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="自定义选中状态颜色" padding>
				<RadioGroup value="1" className={style.customColors}>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="自定义大小" padding>
				<RadioGroup value="1" className={style.customSize}>
					<Radio name="1">单选框1</Radio>
					<Radio name="2">单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="自定义图标" padding>
				<RadioGroup  
					value={radioIcon} 
					onChange={onChangeRadioIcon}
				>
					<Radio 
						name="1"
						icon={
							<Icon 
								name={
									radioIcon === '1' 
									? 
									ICONS.actived
									:
									ICONS.inactived
								}  
							/>
						}
					>单选框1</Radio>
					<Radio 
						name="2"
						icon={
							<Icon 
								name={
									radioIcon === '2' 
									? 
									ICONS.actived
									:
									ICONS.inactived
								}  
							/>
						}
					>单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="禁用文本点击" padding>
				<RadioGroup value={radioLabelDisabled} onChange={onChangeRadioLabelDisabled}>
					<Radio name="1" labelDisabled>单选框1</Radio>
					<Radio name="2" labelDisabled>单选框2</Radio>
				</RadioGroup>
			</DemoBlock>

			<DemoBlock title="与 Cell 组件一起使用">
				<CellGroup>
					<Cell 
						title="单选框1"
						data-name="1"
						rightIcon={
							<Radio value={radio3} name="1" />
						}
						onClick={onClickCell}
					/>

					<Cell
						title="单选框2"
						data-name="2"
						rightIcon={
							<Radio value={radio3} name="2" />
						}
						onClick={onClickCell}
					/>
				</CellGroup>
			</DemoBlock>
		</DemoPage>
	)
}

export default RadioPage 