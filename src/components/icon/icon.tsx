import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import { View, Image, ITouchEvent } from '@tarojs/components'
import { withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { isImageUrl } from '../../utils/validator'
import Info from '../info'

const BLOCK = 'icon'

export interface IconProps {
	/** 图标名称或图片链接 */
	name: string;

	// 是否显示图标右上角小红点
	dot?: boolean;

	// 图标右上角文字提示
	info?: string | number;

	// 类名前缀
	classPrefix?: string;

	// 点击图标时触发
	onClick?: (event: ITouchEvent) => void;
}

const defaultProps = {
	dot: false,
	classPrefix: 'van-icon'	
}

export const Icon: FC<IconProps> = props => {
	const {
		name,
		dot,
		info,
		classPrefix,
		onClick
	} = mergeProps(defaultProps, props)

	const isImgIcon = useMemo(() => {
		return isImageUrl(name)
	}, [name])

	const blockClassName = classNames(
		bemBlock(BLOCK, {image: isImgIcon}),
		!isImgIcon&&classPrefix,
		!isImgIcon&&`${classPrefix}-${name}`
	)

	return withNativeProps(
		props,
		<View
			className={blockClassName}
			onClick={onClick}
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
				<Image 
					src={name}
					mode="aspectFit"
					className={bemElement(BLOCK, 'image')}
				/>
			}	
		</View>
	)
}
