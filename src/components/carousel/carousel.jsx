import { useState } from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { Swiper, SwiperItem } from '@tarojs/components'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Image from '../image'

const BLOCK = 'carousel'

export const Carousel = props => {
	const { 
		images, 
		fitMode,
		autoplay, 
		interval,
		duration,
		circular,
		vertical,
		showIndicator 
	} = props

	const [current, setCurrent] = useState(0)

	const onChangeCurrent = useMemoizedFn((event) => {
		setCurrent(event.detail.current)
	})

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			<Swiper 
				current={current}
				autoplay={autoplay}
				interval={interval}
				duration={duration}
				circular={circular}
				vertical={vertical}
				onChange={onChangeCurrent}
				className={bemElement(BLOCK, 'swiper')}
			>
				{
					images.map((imgSrc, index) => {
						return (
							<SwiperItem 
								key={index} 
								className={bemElement(BLOCK, 'swiper-item')}
							>
								<Image 
									src={imgSrc} 
									fit={fitMode} 
									showLoading
									className={bemElement(BLOCK, 'image')} 
								/>
							</SwiperItem>
						)	
					})
				}
			</Swiper>

			{
				showIndicator
				&&
				<view className={bemElement(BLOCK, 'indicator')}>
					{
						images.map((_, index) => {
							const actived = current === index

							return (
								<view 
									className={bemElement(BLOCK, 'indicator-item', {actived})} 
								/>
							)
						})
					}
				</view>
			}
		</view>
	)
}

Carousel.propTypes = {
	images: PropTypes.arrayOf(PropTypes.string).isRequired,
	fitMode: PropTypes.oneOf([
		'none', 
		'fill', 
		'cover', 
		'contain', 
		'widthFix', 
		'heightFix'
	]),
	showIndicator: PropTypes.bool,
	autoplay: PropTypes.bool,
	interval: PropTypes.number,
	duration: PropTypes.number,
	circular: PropTypes.bool,
	vertical: PropTypes.bool
} 

Carousel.defaultProps = {
	fitMode: 'cover',
	autoplay: true,
	interval: 5000,
	duration: 500,
	circular: false,
	vertical: false
}
