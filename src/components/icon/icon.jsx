import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isImageUrl } from '../../utils/validator'
import Info from '../info'

const BLOCK = 'icon'

export const Icon = props => {
	const { 
		name, 
		dot,
		info,
		classPrefix, 
		onClick 
	} = props

	const isImgIcon = isImageUrl(name)

	return withNativeProps(
		props,
		<view
			className={classNames(
				bemBlock(BLOCK, {image: isImgIcon}),
				!isImgIcon&&classPrefix,
				!isImgIcon&&`${classPrefix}-${name}`
			)}
			onTap={onClick}
		>
			{
				(!!info || dot)
				&&
				<Info 
					dot={dot}
					info={info}
					className={bemElement(BLOCK, 'info')}
				/>
			}

			{
				isImageUrl(name)
				&&
				<image 
					src={name}
					mode="aspectFit"
					className={bemElement(BLOCK, 'image')}
				/>
			}	
		</view>
	)
}

Icon.propTypes = {
	name: PropTypes.string,
	dot: PropTypes.bool,
	info: PropTypes.string,
	classPrefix: PropTypes.string,
	onClick: PropTypes.func
} 

Icon.defaultProps = {
	classPrefix: 'van-icon'	
}
