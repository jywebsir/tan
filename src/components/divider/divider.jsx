import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'

const BLOCK = 'divider'

export const Divider = props => {
	const {
		dashed,
		hairline,
		contentPosition,
		children
	} = props

	return withNativeProps(
		props,
		<view className={bemBlock(
			BLOCK, 
			[{dashed, hairline}, contentPosition])
		}>
			{children}
		</view>
	)
}

Divider.propTypes = {
	dashed: PropTypes.bool,
	hairline: PropTypes.bool,
	contentPosition: PropTypes.oneOf(['left', 'center', 'right'])
}
