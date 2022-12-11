import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import useCountDown from './use-count-down'

const BLOCK = 'count-down'

export const CountDown = forwardRef((props, ref) => {
	const {
		formattedTime
	} = useCountDown({
		ref,
		...props
	})

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			{props.children ?? formattedTime}
		</view>
	)
})

CountDown.propTypes = {
	time: PropTypes.number,
	format: PropTypes.string,
	millisecond: PropTypes.bool,
	autoStart: PropTypes.bool,
	onChange: PropTypes.func,
	onFinish: PropTypes.func
}

CountDown.defaultProps = {
	millisecond: false,
	format: 'HH:mm:ss',
	autoStart: true
}
