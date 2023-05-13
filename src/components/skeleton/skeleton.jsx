import React from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import SkeletonRows from './skeleton-rows'
import SkeletonCols from './skeleton-cols'

export const BLOCK = 'skeleton'

export const Skeleton = props => {
	const {
		direction,
		loading,
		title,
		avatar,
		avatarShape,
		animate,
		row,
		col
	} = props

	return withNativeProps(
		props,
		loading
		?
		<view className={bemBlock(BLOCK, {animate})}>
			{
				avatar
				&&
				<view className={bemElement(BLOCK, 'avatar', [avatarShape])} />
			}

			<view className={bemElement(BLOCK, 'content')}>
				{
					title
					&&
					<view className={bemElement(BLOCK, 'title')} />
				}

				{
					direction === 'row'
					&&
					row
					&&
					<SkeletonRows rows={Array.from({length: row})} />
				}

				{
					direction === 'col'	
					&&
					col
					&&
					<SkeletonCols cols={Array.from({length: col})} />
				}
			</view>
		</view>
		:
		<view className={bemElement(BLOCK, 'content')}>{props.children}</view>
	)
}

Skeleton.propTypes = {
	direction: PropTypes.oneOf(['row', 'col']),
	row: PropTypes.number,
	col: PropTypes.number,
	title: PropTypes.bool,
	avatar: PropTypes.bool,
	loading: PropTypes.bool,
	animate: PropTypes.bool,
	avatarShape: PropTypes.oneOf(['round', 'square']),
}

Skeleton.defaultProps = {
	direction: 'row',
	loading: true,
	animate: true,
	avatarShape: 'round'
}