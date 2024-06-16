import React from 'react'
import PropTypes from 'prop-types'
import { bemBlock, bemElement } from '../../utils/class-name'
import { withNativeProps } from '../../utils/native-props'
import { isString } from '../../utils/validator'

const BLOCK = 'empty'
const PRESETS = ['error', 'search', 'default', 'network']

const imageUrl = (image) => {
	if (PRESETS.includes(image)) {
		return `https://img.yzcdn.cn/vant/empty-image-${image}.png`
	}

	return image
}

export const Empty = props => {
	const {
		description, image, children
	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			{
				image
				&&
				<view className={bemElement(BLOCK, 'image')}>
					{
						isString(image)
						?
						<image 
							src={imageUrl(image)} 
							className={bemElement(BLOCK, 'image__img')} 
						/>
						:
						image
					}
				</view>
			}

			{
				description
				&&
				<view className={bemElement(BLOCK, 'description')}>{description}</view>
			}

			{
				children
				&&
				<view className={bemElement(BLOCK, 'bottom')}>{children}</view>
			}
		</view>
	)
}

Empty.propTypes = {
	description: PropTypes.node,
	image: PropTypes.node
} 

Empty.defaultProps = {
	image: 'default'
}
