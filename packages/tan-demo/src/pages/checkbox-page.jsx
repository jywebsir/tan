import React, { useState } from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Icon from '@/components/icon'
import Checkbox from '@/components/checkbox'
import Cell from '@/components/cell'
import CellGroup from '@/components/cell-group'
import style from '../styles/checkbox-page.module.scss'

const ICONS = {
	unChecked: 'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
	checked: 'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png'
}

const LIST = [
	'a', 'b', 'c'
]

const CheckboxPage = () => {
	const [checked, setChecked] = useState(false)
	const [result, setResult] = useState(['a', 'b'])
	const [cellVals, setCellVals] = useState([])

	const onChangeChecked = (val) => {
		setChecked(val)
	}

	const onChangeResult = (val) => {
		setResult(val)
	}

	const onClickCell = (event) => {
		const { value } = event.currentTarget.dataset

		if (cellVals.includes(value)) {
			setCellVals(cellVals.filter((val) => {
				return val !== value
			}))
		}else {
			setCellVals([
				...cellVals,
				value
			])
		}
	}

	return (
		<DemoPage bgColor="#FFFFFF" className={style.container}>
			<DemoBlock title="单独用法" className={style.single} padding>
				<Checkbox>非受控的</Checkbox>
				<Checkbox checked={checked} onChange={onChangeChecked}>受控选中</Checkbox>
				<Checkbox defaultChecked>默认选中的</Checkbox>
				<Checkbox defaultChecked disabled>禁用的</Checkbox>
				<Checkbox labelDisabled>禁用文本点击</Checkbox>
				<Checkbox shape="round">自定义形状</Checkbox>
				<Checkbox defaultChecked className={style.customColor}>自定义颜色</Checkbox>
				<Checkbox className={style.customSize}>自定义大小</Checkbox>
				<Checkbox 
					icon={(checked) => {
						return (
							<Icon name={checked ? ICONS.checked : ICONS.unChecked} />
						)
					}}
				>自定义图标</Checkbox>
			</DemoBlock>

			<DemoBlock title="复选框组不受控用法" padding>
				<Checkbox.Group>
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="复选框组受控用法" padding>
				<Checkbox.Group value={result} onChange={onChangeResult}>
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="复选框组默认选中" padding>
				<Checkbox.Group defaultValue={['a', 'c']}>
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="复选框组水平排列" padding>
				<Checkbox.Group direction="horizontal">
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="复选框组自定义形状" padding>
				<Checkbox.Group shape="round">
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="复选框组禁用" padding>
				<Checkbox.Group defaultValue={['a', 'b']} disabled>
					{
						LIST.map((item) => {
							return (
								<Checkbox key={item} value={item}>复选框{item}</Checkbox>
							)
						})
					}
				</Checkbox.Group>
			</DemoBlock>

			<DemoBlock title="搭配单元格组件使用">
				<Checkbox.Group value={cellVals}>
					<CellGroup>
						<Cell 
							title="复选框a"
							data-value="a"
							rightIcon={
								<Checkbox value="a" />
							}
							clickable
							onClick={onClickCell}
						/>

						<Cell 
							title="复选框b"
							data-value="b"
							rightIcon={
								<Checkbox value="b" />
							}
							clickable
							onClick={onClickCell}
						/>
					</CellGroup>
				</Checkbox.Group>
			</DemoBlock>
			
		</DemoPage>
	)	
}

export default CheckboxPage