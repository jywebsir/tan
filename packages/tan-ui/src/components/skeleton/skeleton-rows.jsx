import React from 'react'
import PropTypes from 'prop-types'
import { bemElement } from '../../utils/class-name'
import { BLOCK } from './skeleton'

const SkeletonRows = props => {
	const { rows } = props

	return (
		<>
		{
		 	rows.map((_, index) => {
				return (
					<view 
						key={index} 
						className={bemElement(BLOCK, 'row', [index])} 
					/>
				)
			})	
		}	
		</>
	)
}

SkeletonRows.propTypes = {
	rows: PropTypes.array.isRequired
} 

export default React.memo(SkeletonRows)