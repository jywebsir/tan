import React, { useRef, useEffect } from 'react'
import IndexBar from '@/components/index-bar'
import Cell from '@/components/cell'

const IndexBarPage = () => {
	const ref = useRef()

	const scrollToIndexC = () => {
		ref?.current?.scrollToIndex('E')
	}

	useEffect(() => {
		setTimeout(() => {
			scrollToIndexC()
		}, 2000)
	}, [])

	return (
		<IndexBar 
			ref={ref}
			lazyRender
		>
			<IndexBar.Group index="A">
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
				
			</IndexBar.Group>

			<IndexBar.Group index="B">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="C">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="D">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="E">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="F">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="G">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="H">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="I">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="J">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="K">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="L">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="M">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="N">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="O">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="P">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="Q">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="R">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="S">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="T">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="U">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="V">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="W">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="X">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="Y">
				<Cell title="文本" />
				<Cell title="文本" />
				<Cell title="文本" />
			</IndexBar.Group>

			<IndexBar.Group index="Z">
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
			</IndexBar.Group>
		</IndexBar>
	)
}

export default IndexBarPage 