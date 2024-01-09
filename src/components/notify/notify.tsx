import React, { FC, useMemo } from 'react'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Transition from '../transition'
import type { NotifyOptions } from './notify.type'
import useNotify from './use-notify'

const BLOCK = 'notify'

export const Notify: FC<NotifyOptions> = props => {
	const {
		show,
		statusBarHeight,
		type,
		message,
		color,
		background,
		safeAreaInsetTop
	} = useNotify(props)

	const contentInlineStyle = useMemo(() => {
		const style: React.CSSProperties = { color }

		if (background) {
			style.background = background
		}

		return style
	}, [color, background])

	return withNativeProps(
		props,
		<Transition
			name="slide-down"
			show={show}
			className={bemBlock(BLOCK)}
		>
			<view 
				style={contentInlineStyle}
				className={bemElement(BLOCK, 'content', [type])}
			>
				{
					safeAreaInsetTop
					&&
					<view style={{height: `${statusBarHeight}px`}} />
				}

				<text>{message}</text>
			</view>
		</Transition>
	)
}


