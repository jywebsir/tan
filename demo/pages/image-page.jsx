import React from 'react'
import classNames from 'classnames'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Row from '@/components/row'
import Col from '@/components/col'
import Image from '@/components/image'
import style from '../styles/image-page.module.scss'

const src = 'https://img.yzcdn.cn/vant/cat.jpeg'

const ImagePage = props => {
	return (
		<DemoPage>
			<DemoBlock title="基础用法" padding>
				<Row>
					<Image src={src} className={style.basic} />	
				</Row>
			</DemoBlock>

			<DemoBlock title="填充模式" padding>
				<Row wrap>
					<Col span="8" className={style.colFit}>
						<Image 
							src={src} 
							fit="none"
							className={style.fit}
						/>	

						<view className={style.text}>none</view>
					</Col>

					<Col span="8" className={style.colFit}>
						<Image 
							src={src} 
							fit="fill"
							className={style.fit}
						/>		

						<view className={style.text}>fill</view>
					</Col>

					<Col span="8" className={style.colFit}>
						<Image 
							src={src} 
							fit="cover"
							className={style.fit}
						/>		

						<view className={style.text}>cover</view>
					</Col>

					<Col span="8" className={style.colFit}>
						<Image 
							src={src} 
							fit="contain"
							className={style.fit}	
						/>		

						<view className={style.text}>contain</view>
					</Col>

					<Col span="8" className={style.colFit}>
						<Image 
							src={src} 
							fit="widthFix"
							className={style.fit}
						/>		

						<view className={style.text}>widthFix</view>
					</Col>

					<Col span="8">
						<Image 
							src={src} 
							fit="heightFix"
							className={style.fit}
						/>		
						<view className={style.text}>heightFix</view>
					</Col>
				</Row>
			</DemoBlock>

			<DemoBlock title="圆形图片" padding>
				<Row>
					<Image src={src} round className={style.round} />	
				</Row>
			</DemoBlock>

			<DemoBlock title="加载中提示" padding>
				<Row>
					<Col span="8">
						<Image className={style.loading} />		

						<view className={style.text}>默认提示</view>	
					</Col>
				</Row>
			</DemoBlock>
		</DemoPage>
	)
}

export default ImagePage