import React, { FC } from 'react'
import { View, StandardProps } from '@tarojs/components'
import { withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { bemBlock } from '../../utils/class-name'

const BLOCK = 'info'

export interface InfoProps extends StandardProps {
	dot?: boolean;
	info?: string | number; 
}

const defaultProps = {
	dot: false
}

export const Info: FC<InfoProps> = props => {
	const {
		dot,
		info
	} = mergeProps(defaultProps, props)

	if (!!info || dot) {
		return withNativeProps(
			props,
			<View className={bemBlock(BLOCK, {dot})}>{info}</View>
		)
	}

	return null
}

