import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { bemBlock, bemElement } from '../../utils/class-name'
import { withNativeProps } from '../../utils/native-props'
import Icon from '../icon'

const BLOCK = 'image'

const FIT_MODES = {
	none: 'center',
  fill: 'scaleToFill',
  cover: 'aspectFill',
  contain: 'aspectFit',
  widthFix: 'widthFix',
  heightFix: 'heightFix'
}

export const Image = props => {
	const {
		src,
		fit,
		round,
		lazyLoad,
		showMenuByLongpress,
		showError,
		showLoading,
		loadingSlot,
		errorSlot,
		onLoad,
		onError,
		onClick
	} = props

	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleLoad = useMemoizedFn((event) => {
		setLoading(false)

		if (onLoad) {
			onLoad(event.detail)
		}
	})

	const handleError = useMemoizedFn((event) => {
		setError(true)
		setLoading(false)

		if (onError) {
			onError(event.detail)
		}
	})

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK, {round})} onTap={onClick}>
			{
				!error
				&&
				<image 
					src={src}
					mode={FIT_MODES[fit]}
					lazyLoad={lazyLoad}
					showMenuByLongpress={showMenuByLongpress}
					className={bemElement(BLOCK, 'img')}
					onLoad={handleLoad}
					onError={handleError}
				/>
			}

			{
				loading
				&&
				showLoading
				&&
				<view className={bemElement(BLOCK, 'loading')}>
					{
						loadingSlot
						?
						loadingSlot
						:
						<Icon name="photo" className={bemElement(BLOCK, 'loading-icon')} />
					}
				</view>
			}

			{
				error
				&&
				showError
				&&
				<view className={bemElement(BLOCK, 'error')}>
					{
						errorSlot
						?
						errorSlot
						:
						<Icon name="photo-fail" className={bemElement(BLOCK, 'error-icon')} />	
					}
				</view>
			}
		</view>
	)
}

Image.propTypes = {
	src: PropTypes.string,
	fit: PropTypes.oneOf(Object.keys(FIT_MODES)),
	round: PropTypes.bool,
	lazyLoad: PropTypes.bool,
	showMenuByLongpress: PropTypes.bool,
	showError: PropTypes.bool,
	showLoading: PropTypes.bool,
	loadingSlot: PropTypes.node,
	errorSlot: PropTypes.node,
	onLoad: PropTypes.func,
	onError: PropTypes.func,
	onClick: PropTypes.func
}

