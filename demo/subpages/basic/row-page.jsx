import React from 'react'
import classNames from 'classnames'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Row from '@/components/row'
import Col from '@/components/col'
import style from '../../styles/row-page.module.scss'

const RowPage = () => {
	return (
		<DemoPage className={style.container}>
			<DemoBlock title="基础用法">
				<Row className={style.row} align="stretch">
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>span: 8</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>span: 8</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>span: 8</Col>
				</Row>

				<Row className={style.row}>
					<Col 
						span="4" 
						className={classNames(style.col, style.dark)}
					>span: 4</Col>

					<Col 
						span="10" 
						offset="4" 
						className={classNames(style.col, style.light)}
					>offset: 4, span: 10</Col>
				</Row>

				<Row className={style.row}>
					<Col 
						span="12" 
						offset="12" 
						className={classNames(style.col, style.light)}
					>offset: 12, span: 12</Col>	
				</Row>
			</DemoBlock>

			<DemoBlock title="在列元素之间增加间距">
				<Row className={classNames(style.row, style.gutter)}>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>span: 8</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>span: 8</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>span: 8</Col>	
				</Row>
			</DemoBlock>

			<DemoBlock title="行对齐方式">
				<Row 
					justify="start" 
					align="stretch" 
					className={classNames(style.row, style.gutter)}
				>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>start</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>start</Col>
				</Row>
				
				<Row 
					justify="center" 
					align="stretch" 
					className={classNames(style.row, style.gutter)}
				>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>center</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>center</Col>
				</Row>

				<Row 
					justify="end" 
					align="stretch" 
					className={classNames(style.row, style.gutter)}
				>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>end</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>end</Col>
				</Row>

				<Row 
					justify="between" 
					align="stretch" 
					className={classNames(style.row)}
				>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>between</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>between</Col>
				</Row>

				<Row 
					justify="around" 
					align="stretch" 
					className={classNames(style.row)}
				>
					<Col 
						span="8" 
						className={classNames(style.col, style.dark)}
					>around</Col>

					<Col 
						span="8" 
						className={classNames(style.col, style.light)}
					>around</Col>
				</Row>

			</DemoBlock>

			<DemoBlock title="列垂直对齐方式">
				<Row 
					justify="start" 
					align="stretch" 
					className={classNames(style.row, style.gutter)}
				>
					<Col 
						span="8" 
						justify="start"
						className={classNames(style.col, style.dark)}
					>start</Col>

					<Col 
						span="8" 
						justify="center"
						className={classNames(style.col, style.light)}
					>center</Col>

					<Col 
						span="8" 
						justify="end"
						className={classNames(style.col, style.light)}
					>end</Col>
				</Row>	

				<Row
					justify="start" 
					align="stretch" 
					className={classNames(style.row, style.high, style.gutter)}
				>
					<Col 
						span="12" 
						justify="between"
						className={classNames(style.col, style.dark)}
					>
						<view>between</view>
						<view>between</view>
					</Col>

					<Col 
						span="12" 
						justify="around"
						className={classNames(style.col, style.light)}
					>
						<view>around</view>
						<view>around</view>
					</Col>
				</Row>
			</DemoBlock>

			<DemoBlock title="列水平对齐方式">
				<Row 
					justify="start" 
					align="stretch" 
					className={classNames(style.row, style.gutter)}
				>
						<Col 
							span="8" 
							align="start"
							className={classNames(style.col, style.dark)}
						>start</Col>

						<Col 
							span="8" 
							align="center"
							className={classNames(style.col, style.dark)}
						>center</Col>	

						<Col 
							span="8" 
							align="end"
							className={classNames(style.col, style.dark)}
						>end</Col>
				</Row>
			</DemoBlock>	
		</DemoPage>
	)	
}

export default RowPage 