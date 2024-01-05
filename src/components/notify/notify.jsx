import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Transition from '../transition'
import useNotify from './use-notify'

const BLOCK = 'notify'

export const Notify = props => {
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
		const style = {color}

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

Notify.propTypes = {
	type: PropTypes.oneOf(['primary', 'success', 'warning', 'danger']),
	color: PropTypes.string,
	background: PropTypes.string,
	message: PropTypes.string,
	duration: PropTypes.number,
	safeAreaInsetTop: PropTypes.bool,
	onClick: PropTypes.func,
	onOpened: PropTypes.func,
	onClose: PropTypes.func
}

Notify.defaultProps = {
	type: 'danger',
	color: '#FFFFFF',
	message: '',
	duration: 3000,
	safeAreaInsetTop: false
}
