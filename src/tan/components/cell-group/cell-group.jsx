import React from 'react'
import PropTypes from 'prop-types'
import { 
	bemBlock, 
	bemElement, 
} from '../../utils/class-name'

const BLOCK = 'cell-group'

export const CellGroup = props => {
	const {
		title,
		border,
		inset,
		children
	} = props

	return (
		<>
			{
				title
				&&
				<view className={bemElement(
					BLOCK,
					'title',
					[
						{
							inset
						}
					]
				)}>{title}</view>	
			}

			<view className={bemBlock(
				BLOCK,
				[
					{
						inset,
						border
					}
				]
			)}>{children}</view>
		</>
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