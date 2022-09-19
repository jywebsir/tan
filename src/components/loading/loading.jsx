import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'

const BLOCK = 'loading'

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

export const Loading = props => {
	const {
		vertical,
		type,
		children
	} = props

	const isSpinner = type === 'spinner'

	const blockClsName = bemBlock(
		BLOCK,
		[
			{
				vertical
			}
		]
	)

	return withNativeProps(
		props,
		<view className={blockClsName}>
			<view className={bemElement(BLOCK, 'spinner', [type])}>
				{
					isSpinner
					&&
					renderDots()
				}
			</view>

			<view className={bemElement(BLOCK, 'text')}>{children}</view>
		</view>
	)
}

Loading.propTypes = {
	vertical: PropTypes.bool,
	type: PropTypes.oneOf(['circular', 'spinner'])
}

Loading.defaultProps = {
	type: 'circular'
}

