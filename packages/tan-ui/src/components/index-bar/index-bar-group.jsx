import React from 'react'
import PropTypes from 'prop-types'

const IndexBarGroup = () => {
	return null
}

IndexBarGroup.propTypes = {
	index: PropTypes.string,
	title: PropTypes.node,
	brief: PropTypes.node
} 

export default React.memo(IndexBarGroup)