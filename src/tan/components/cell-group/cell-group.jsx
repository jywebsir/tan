import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'

const classPrefix = 'tam-cell-group'

export const CellGroup = props => {
	const {
		title,
		border,
		inset,
		children
	} = props

	return withNativeProps(
		props,
		<view className={classNames(
			classPrefix
		)}>
			{
				title
				&&
				<view className={classNames(
					`${classPrefix}__title`,
					border&&`${classPrefix}__title--inset`
				)}>{title}</view>
			}

			<view className={classNames(
				`${classPrefix}__content`,
				inset && `${classPrefix}__content--inset`,
				border && `${classPrefix}__content--border`
			)}>{children}</view>
		</view>
	)
}

CellGroup.propTypes = {
	title: PropTypes.string,
	border: PropTypes.bool,
	inset: PropTypes.bool	
} 

CellGroup.defaultProps = {
	border: true
}