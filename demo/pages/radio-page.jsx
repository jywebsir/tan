import React, { useState } from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Icon from '@/components/icon'
import Radio from '@/components/radio'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import style from '../styles/radio-page.module.scss'

const ICONS = {
	inactived: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
	actived: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
}

const RadioPage = () => {
	const [checked, setChecked] = useState(false)
	const [radio1, setRadio1] = useState('1')
	const [radio2, setRadio2] = useState('2')
	const [radioIcon, setRadioIcon] = useState('1')
	const [radioShape, setRadioShape] = useState('1')
	const [radioLabelDisabled, setRadioLabelDisabled] = useState('1')
	const [radio3, setRadio3] = useState('1')

	const onChangeChecked = (val) => {
		setChecked(val)
	}

	const onChangeRadio1 = (value) => {
		setRadio1(value)
	}

	const onChangeRadio2 = (value) => {
		setRadio2(value)
	}

	const onChangeRadioShape = (value) => {
		setRadioShape(value)
	}

	const onChangeRadioIcon = (value) => {
		setRadioIcon(value)
	}

	const onChangeRadioLabelDisabled = (value) => {
		setRadioLabelDisabled(value)
	}

	const onClickCell = (event) => {
		const { value } = event.currentTarget.dataset

		setRadio3(value)
	}

	return (
		<DemoPage className={style.container}>
			<DemoBlock title="单独用法" padding>
				<Radio>非受控的</Radio>
				<Radio checked={checked} onChange={onChangeChecked}>受控选中</Radio>
				<Radio defaultChecked>默认选中的</Radio>
			</DemoBlock>

			<DemoBlock title="基础分组用法" padding>
				<Radio.Group value={radio1} onChange={onChangeRadio1}>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="水平排列" padding>
				<Radio.Group direction="horizontal" value={radio2} onChange={onChangeRadio2}>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="禁用状态" padding>
				<Radio.Group value="1" disabled>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="自定义形状" padding>
				<Radio.Group shape="square" value={radioShape} onChange={onChangeRadioShape}>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="自定义选中状态颜色" padding>
				<Radio.Group value="1" className={style.customColors}>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="自定义大小" padding>
				<Radio.Group value="1" className={style.customSize}>
					<Radio value="1">单选框1</Radio>
					<Radio value="2">单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="自定义图标" padding>
				<Radio.Group  
					value={radioIcon} 
					onChange={onChangeRadioIcon}
				>
					<Radio 
						value="1"
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
						value="2"
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
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="禁用文本点击" padding>
				<Radio.Group value={radioLabelDisabled} onChange={onChangeRadioLabelDisabled}>
					<Radio value="1" labelDisabled>单选框1</Radio>
					<Radio value="2" labelDisabled>单选框2</Radio>
				</Radio.Group>
			</DemoBlock>

			<DemoBlock title="与 Cell 组件一起使用">
				<Radio.Group value={radio3}>
					<CellGroup>
						<Cell 
							title="单选框1"
							data-value="1"
							rightIcon={
								<Radio value="1" />
							}
							onClick={onClickCell}
						/>

						<Cell
							title="单选框2"
							data-value="2"
							rightIcon={
								<Radio value="2" />
							}
							onClick={onClickCell}
						/>
					</CellGroup>
				</Radio.Group>
			</DemoBlock>
		</DemoPage>
	)
}

export default RadioPage 