import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock } from '../../utils/class-name'
import Transition from '../transition'

const BLOCK = 'overlay'

export const Overlay = props => {
	const {
		show,
		duration,
		zIndex,
		lockScroll,
		children,
		onClick
	} = props

	const inlineStyle = {
		zIndex
	}

	return withNativeProps(
		props,
		<Transition 
			show={show} 
			style={inlineStyle}
			duration={duration}
			lockScroll={lockScroll}
			className={bemBlock(BLOCK)}
			onClick={onClick}
		>
			{children}	
		</Transition>
	)
}

Overlay.propTypes = {
	show: PropTypes.bool,
	duration: PropTypes.number,
	zIndex: PropTypes.number,
	lockScroll: PropTypes.bool,
	onClick: PropTypes.func
} 

Overlay.defaultProps = {
	duration: 300,
	zIndex: 1,
	lockScroll: true
}
