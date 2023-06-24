import React from 'react'
import IndexBar from '@/components/index-bar'
import IndexBarGroup from '@/components/index-bar/index-bar-group'
import Cell from '@/components/cell'

const IndexBarPage = () => {
	return (
		<IndexBar 
			highlightColor="#1989fa" 
			style={{backgroundColor: '#f7f8fa'}}
			lazyRender
		>
			<IndexBarGroup index="A">
				{
					({
						activeGroupIndexes
					}) => {
						return (
							<view>
								<Cell title="文本" />
								<Cell title="文本" />
								<Cell title="文本" />
							</view>
						)
					}
				}
				
			</IndexBarGroup>

			<IndexBarGroup index="B">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="C">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="D">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="E">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="F">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="G">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="H">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="I">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="J">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="K">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="L">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="M">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="N">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="O">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="P">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="Q">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="R">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="S">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="T">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="U">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="V">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="W">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="X">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="Y">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>

			<IndexBarGroup index="Z">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBarGroup>
		</IndexBar>
	)
}

export default IndexBarPage 