import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import Flex from '../flex'

const classPrefix = 'tan-col'

export const Col = props => {
	const { 
		children, 
		span,
		offset,
		...flexProps
	} = props

	return withNativeProps(
		props,
		<Flex 
			{...flexProps}
			direction="vertical" 
			className={classNames(
				classPrefix,
				span&&`${classPrefix}--${span}`,
				offset&&`${classPrefix}--offset-${offset}`
			)}
		>
			{children}
		</Flex>
	) 
}

Col.propTypes = {
	span: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),

	offset: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
}