import React from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import CellGroup from '../tan/components/cell-group'
import Cell from '../tan/components/cell'
import Icon from '../tan/components/icon'

const CellPage = () => {
	return (
		<DemoPage>
			<DemoBlock title="基础用法">
				<CellGroup>
					<Cell 
						title="单元格" 
						value="内容" 
					/>
					<Cell 
						title="单元格2" 
						value="内容" 
						label="描述信息" 
						border={false}
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="卡片风格">
				<CellGroup inset>
					<Cell 
						title="单元格" 
						value="内容" 
					/>

					<Cell 
						title="单元格" 
						value="内容" 
						label="描述信息" 
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="单元格大小">
				<CellGroup>
					<Cell 
						title="单元格" 
						value="内容" 
						size="large"
					/>

					<Cell 
						title="单元格" 
						value="内容" 
						label="描述信息" 
						size="large"
						border={false}
					/>
				</CellGroup>
			</DemoBlock>

			<DemoBlock title="展示图标">
				<Cell 
					title="单元格"
					value="内容"
					icon={<Icon name="plus" />}
					border={false}
				/>
			</DemoBlock>

			<DemoBlock title="展示箭头">
					<Cell 
						title="单元格" 
						value="内容" 
						rightIcon
					/>

					<Cell 
						title="单元格" 
						value="内容" 
						rightIcon={<Icon name="arrow-down" />}
					/>
			</DemoBlock>

			<DemoBlock title="展示点击效果">
					<Cell 
						title="单元格" 
						value="内容" 
						clickable
						rightIcon
					/>
			</DemoBlock>

			<DemoBlock title="分组标题">
				<CellGroup title="分组 1">
					<Cell title="单元格" value="内容" />
				</CellGroup>	

				<CellGroup title="分组 2">
					<Cell title="单元格" value="内容" />
				</CellGroup>	
			</DemoBlock>

			<DemoBlock title="垂直居中">
				<Cell 
					title="单元格"	
					value="内容"
					label="描述信息"
					center
				/>
			</DemoBlock>
		</DemoPage>
	)	
}

export default CellPage 