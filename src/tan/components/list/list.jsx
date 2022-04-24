import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const classPrefix = `tan-list`

const List = props => {
	const { 
		header, 
		mode,
		children 
	} = props

	return (
		<view className={classNames(
			classPrefix, 
			`${classPrefix}-${mode}`
		)}>
			{
				header
				&&
				<view className={`${classPrefix}-header`}>{header}</view>
			}

			<view className={`${classPrefix}-body`}>
        <view className={`${classPrefix}-body-inner`}>{children}</view>
      </view>
		</view>
	)	
}

List.propTypes = {
	header: PropTypes.node,
	mode: PropTypes.oneOf(['default', 'card'])
}

List.defaultProps = {
	mode: 'default'
}

export default React.memo(List)
