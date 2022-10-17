import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import DropdownItem from '@/components/dropdown-item'
import DropdownMenu from '@/components/dropdown-menu'

const option1 = [
	{ text: '全部商品', value: 0 },
	{ text: '新款商品', value: 1 },
	{ text: '活动商品', value: 2 },
]

const option2 = [
	{ text: '默认排序', value: 'a' },
	{ text: '好评排序', value: 'b' },
	{ text: '销量排序', value: 'c' },
]

const DropdownMenuPage = () => {
	const [value1, setValue1] = useState(0)
	const [value2, setValue2] = useState('a')

	const onChangeValue1 = useMemoizedFn((val) => {
		setValue1(val)
	})

	const onChangeValue2 = useMemoizedFn((val) => {
		setValue2(val)
	})

	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<DropdownMenu>
					<DropdownItem 
						value={value1} 
						options={option1} 
						onChange={onChangeValue1}
					/>

					<DropdownItem 
						value={value2} 
						options={option2} 
						onChange={onChangeValue1}
					/>
				</DropdownMenu>		
			</DemoBlock>
		</DemoPage>
	)
}

export default DropdownMenuPage 