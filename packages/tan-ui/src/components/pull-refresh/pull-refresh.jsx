import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import { isFunction } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Loading from '../loading'
import usePullRefresh from './use-pull-refresh'

const BLOCK = 'pull-refresh'

export const PullRefresh = props => {
	const p = pick(
		props, 
		[
			'loading',
			'reachTop', 
			'duration', 
			'disabled', 
			'pullDistance',
			'headHeight',
			'pullingText',
			'releasingText',
			'loadingText',
			'completedText',
			'completedDuration',
			'onRefresh'
		]
	)

	const {
		status,
		distance,
		transitionDuration,
		isPullingStatus,
		isReleasingStatus,
		isLoadingStatus,
		isComletedStatus,
		getStatusText,
		onTouchStart,	
		onTouchMove,
		onTouchEnd
	} = usePullRefresh(p)

	const renderStatus = () => {
		if (isFunction(props.renderStatus)) {
			return props.renderStatus(status)
		}

		if (isPullingStatus || isReleasingStatus || isComletedStatus) {
			return getStatusText()
		}

		if (isLoadingStatus) {
			return (
				<Loading className={bemElement(BLOCK, 'loading')}>
					{getStatusText()}
				</Loading>
			)
		}

		return null
	}

	const trackStyle = {
		transitionDuration: `${transitionDuration}ms`
	}

	if (distance) {
		trackStyle.transform = `translate3d(0, ${distance}px, 0)`
	}

	const headStyle = props.headHeight !== 50 && {
		height: `${props.headHeight}px`	
	}

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			<view 
				className={bemElement(BLOCK, 'track')}
				style={trackStyle}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				onTouchCancel={onTouchEnd}
			>
				<view 
					className={bemElement(BLOCK, 'head')}
					style={headStyle}
				>
					{renderStatus()}	
				</view>

				{props.children}	
			</view>
		</view>
	)
}

PullRefresh.propTypes = {
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	duration: PropTypes.number,
	headHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	reachTop: PropTypes.bool,
	pullDistance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	pullingText: PropTypes.node,
	releasingText: PropTypes.node,
	loadingText: PropTypes.node,
	completedText: PropTypes.node,
	completedDuration: PropTypes.number,
	renderStatus: PropTypes.func,
	onRefresh: PropTypes.func
} 

PullRefresh.defaultProps = {
	disabled: false,
	duration: 300,
	headHeight: 50,
	reachTop: true,
	pullDistance: 50,
	pullingText: '下拉即可刷新...',
	releasingText: '释放即可刷新..',
	loadingText: '加载中...',
	completedText: '刷新成功',
	completedDuration: 500,
}