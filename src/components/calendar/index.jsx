import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock , bemElement } from '../../utils/class-name'
import Popup from '../popup'
import Calendar from './calendar'

export const BLOCK = 'calendar'
export const POSITION_TOP = 'top'
export const POSITION_BOTTOM = 'bottom'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'

export const CalendarContainer = props => {
	const { 
		poppable, 
		position, 
		show, 
		round,
		closeable,
		closeOnClickOverlay,
		onOpen,
		onOpened,
		onClose,
		onClosed
	} = props

	if (poppable) {
		return withNativeProps(
			props,
			<Popup 
				show={show}
				round={round}
				position={position}
				closeable={closeable}
				closeOnClickOverlay={closeOnClickOverlay}
				className={bemElement(BLOCK, 'popup', [position])}
				onEnter={onOpen}
				onClose={onClose}
				onAfterEnter={onOpened}
				onAfterLeave={onClosed}
			>
				<Calendar className={bemBlock(BLOCK)} />
			</Popup>
		)	
	}

	return withNativeProps(
		props,
		<Calendar className={bemBlock(BLOCK)} />
	)	
}

CalendarContainer.propTypes = {
	poppable: PropTypes.bool,
	position: PropTypes.oneOf([
		POSITION_TOP,
		POSITION_BOTTOM,
		POSITION_LEFT,
		POSITION_RIGHT
	]),
	show: PropTypes.bool,
	round: PropTypes.bool,
	closeable: PropTypes.bool,
	closeOnClickOverlay: PropTypes.bool,
	onOpen: PropTypes.func,
	onOpened: PropTypes.func,
	onClose: PropTypes.func,
	onClosed: PropTypes.func
} 

CalendarContainer.defaultProps = {
	poppable: true,
	position: POSITION_BOTTOM,
	show: false,
	closeable: false,
	closeOnClickOverlay: true,
	round: true
}