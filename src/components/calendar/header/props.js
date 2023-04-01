import PropTypes from 'prop-types'

export const propTypes = {
	showTitle: PropTypes.bool,
	showSubtitle: PropTypes.bool,
	subtitle: PropTypes.string,
	title: PropTypes.oneOfType([
		PropTypes.string, 
		PropTypes.element
	]),
	onClickSubtitle: PropTypes.func
}