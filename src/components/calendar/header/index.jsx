import PropTypes from 'prop-types'
import { withNativeProps } from '../../../utils/native-props'
import { bemBlock, bemElement } from '../../../utils/class-name'
import { BLOCK } from '../config'
import { propTypes } from './props'
import CalendarHeaderView from './calendar-header-view'
import useCalendarHeaderViewModel from './use-calendar-header-view-model'

const CalendarHeader = props => {
	const { 
		firstDayOfWeek,
		showTitle,
		showSubtitle,
		title,
		subtitle,
		onClickSubtitle
	} = props

	const weekdays = useCalendarHeaderViewModel(firstDayOfWeek)

	return withNativeProps(
		props,
		<CalendarHeaderView 
			title={title}
			subtitle={subtitle}
			showTitle={showTitle}
			showSubtitle={showSubtitle}
			weekdays={weekdays}
			onClickSubtitle={onClickSubtitle}
		>

		</CalendarHeaderView>
	)
}

CalendarHeader.propTypes = {
	...propTypes,
	firstDayOfWeek: PropTypes.number
}

CalendarHeader.defaultProps = {
	firstDayOfWeek: 0
}

export default React.memo(CalendarHeader)