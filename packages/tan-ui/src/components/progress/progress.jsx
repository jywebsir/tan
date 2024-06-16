import { useRef } from 'react'
import PropTypes from 'prop-types'
import Taro from '@tarojs/taro'
import { useSafeState, useMount, useUpdateEffect } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getElementRect } from '../../utils/element'

const BLOCK = 'progress'

export const Progress = props => {
	const {
		percentage,
		inactive,
		pivotText,
		showPivot
	} = props

	const refPivot = useRef()

	const [pivotRight, setPivotRight] = useSafeState(0)

	const portionStyle = percentage && {
		width: `${percentage}%` 
	}

	const pivotStyle = {
		right: `${pivotRight}PX`
	}

	const initPivotRight = async () => {
		try {
			const pivotRect = await getElementRect(refPivot)

			if (pivotRect) {
				const right = (pivotRect.width * (percentage - 100)) / 100

				setPivotRight(right)
			}
		}catch (err) {
			Taro.showToast({
				title: err.message || err,
				icon: 'none',
				duration: 2000
			})
		}
	}

	useUpdateEffect(() => {
		initPivotRight()		
	}, [percentage])

	useMount(() => {
		initPivotRight()
	})

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			<view 
				className={bemElement(BLOCK, 'portion', {inactive})}
				style={portionStyle}
			>
			{
				showPivot
				&&
				<view 
					ref={refPivot}
					className={bemElement(BLOCK, 'pivot')}
					style={pivotStyle}
				>
					{pivotText || `${percentage}%`}
				</view>
			}
			</view>
		</view>
	)	
}

Progress.propTypes = {
	percentage: PropTypes.number,
	inactive: PropTypes.bool,
	pivotText: PropTypes.string,
	showPivot: PropTypes.bool
} 

Progress.defaultProps = {
	percentage: 0,
	showPivot: true
}