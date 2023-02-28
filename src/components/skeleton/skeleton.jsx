import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import SkeletonRows from './skeleton-rows'

export const BLOCK = 'skeleton'

export const Skeleton = props => {
	const {
		loading,
		title,
		avatar,
		avatarShape,
		animate,
		row
	} = props

	const rowArray = Array.from({length: row})

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

				<SkeletonRows rows={rowArray} />
			</view>
		</view>
		:
		<view className={bemElement(BLOCK, 'content')}>{props.children}</view>
	)
}

Skeleton.propTypes = {
	row: PropTypes.number,
	title: PropTypes.bool,
	avatar: PropTypes.bool,
	loading: PropTypes.bool,
	animate: PropTypes.bool,
	avatarShape: PropTypes.oneOf(['round', 'square']),
}

Skeleton.defaultProps = {
	row: 0,
	loading: true,
	animate: true,
	avatarShape: 'round'
}