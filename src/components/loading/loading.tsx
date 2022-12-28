import React, { FC } from 'react'
import { withNativeProps } from '../../utils/native-props'
import { mergeProps } from '../../utils/with-default-props'
import { bemBlock, bemElement } from '../../utils/class-name'

const BLOCK = 'loading'

export type LoadingProps = {
	vertical?: boolean
	type?: 'circular' | 'spinner'
}

const defaultProps = {
	type: 'circular'
}

const renderDots = () => {
	const dots = []

	for (let $i = 0; $i < 12; $i++) {
		dots.push(
			<view 
				key={$i}
				className={bemElement(BLOCK, 'dot')}
			/>
		)
	}

	return dots
}

export const Loading: FC<LoadingProps> = p => {
	const props = mergeProps(defaultProps, p)

	const isSpinner = props.type === 'spinner'

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, {vertical: props.vertical})}>
			<view className={bemElement(BLOCK, 'spinner', [props.type])}>
				{
					isSpinner
					&&
					renderDots()
				}
			</view>

			<view className={bemElement(BLOCK, 'text')}>{props.children}</view>
		</view>
	)
}