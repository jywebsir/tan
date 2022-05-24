import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { isImageUrl } from '../../utils/validator'
import Info from '../info'

export const Icon = props => {
	const { 
		name, 
		dot,
		info,
		classPrefix, 
		onClick 
	} = props

	return withNativeProps(
		props,
		<view
			className={classNames(
				'tan-icon-container',
				classPrefix,
				`${classPrefix}-${name}` 
			)}
			onTap={onClick}
		>
			{
				(!!info || dot)
				&&
				<Info 
					dot={dot}
					info={info}
					className="tan-icon__info"
				/>
			}

			{
				isImageUrl(name)
				&&
				<image 
					src={name}
					mode="aspectFit"
					className="tan-icon__image"
				/>
			}	
		</view>
	)
}

Icon.propTypes = {
	name: PropTypes.string,
	dot: PropTypes.bool,
	info: PropTypes.string,
	classPrefix: PropTypes.string,
	onClick: PropTypes.func
} 

Icon.defaultProps = {
	classPrefix: 'tan-icon'	
}
