import React from 'react'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
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
				<View className={bemElement(
					BLOCK,
					'title',
					[
						{
							inset
						}
					]
				)}>{title}</View>	
			}

			<View className={bemBlock(
				BLOCK,
				[
					{
						inset,
						border
					}
				]
			)}>{children}</View>
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