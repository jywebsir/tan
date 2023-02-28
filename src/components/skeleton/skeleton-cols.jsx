import React from 'react'
import PropTypes from 'prop-types'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './skeleton'

const SkeletonCols = props => {
	const { cols } = props

	return (
		<view className={bemElement(BLOCK, 'cols')}>
		{
		 	cols.map((_, index) => {
				return (
					<view 
						key={index} 
						className={bemElement(BLOCK, 'col', [index])} 
					/>
				)
			})	
		}	
		</view>
	)
}

SkeletonCols.propTypes = {
	cols: PropTypes.array.isRequired
} 

export default React.memo(SkeletonCols)