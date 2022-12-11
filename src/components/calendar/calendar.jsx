import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Popup from '../popup'

const BLOCK = 'calendar'

const Calendar = props => {
	const {

	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			日历区域
		</view>
	)
}

Calendar.propTypes = {
}

Calendar.defaultProps = {
}

export default Calendar
