import { useRef, useState } from 'react'
import { nextTick } from '@tarojs/taro'
import { 
	useSafeState, 
	useMemoizedFn, 
	usePrevious, 
	useThrottleFn,
	useUpdateEffect
} from 'ahooks'
import { isFunction } from '../../utils/validator'
import useTouch from '../../utils/use-touch'

export const STATUS_AWAITING = 'awaiting'
export const STATUS_PULLING = 'pulling'
export const STATUS_RELEASING = 'releasing'
export const STATUS_LOADING = 'loading'
export const STATUS_COMPLETED = 'completed'

const usePullRefresh = props => {
	const {
		reachTop,
		duration,
		disabled,
		pullDistance: pullDistanceProp,
		headHeight,
		loading,
		pullingText,
		releasingText,
		loadingText,
		completedText,
		completedDuration,
		onRefresh
	} = props

	const [status, setStatus] = useSafeState(STATUS_AWAITING)
	const [distance, setDistance] = useState(0)

	const durationRef = useRef(0)
	const reachTopPrevious = usePrevious(reachTop)
	const touch = useTouch()

	const pullDistance = +(pullDistanceProp || headHeight)
	const isPullingStatus = status === STATUS_PULLING
	const isReleasingStatus = status === STATUS_RELEASING
	const isLoadingStatus = status === STATUS_LOADING
	const isComletedStatus = status === STATUS_COMPLETED

	const resetDuration = () => {
		durationRef.current = 0
	}

	const isTouchable = () => {
		return status !== STATUS_LOADING && status !== STATUS_COMPLETED && !disabled
	}

	const getEaseDistance = (distance) => {
		if (distance > pullDistance) {
			if (distance < pullDistance * 2) {
				distance = pullDistance + (distance - pullDistance) / 2
			} else {
				distance = pullDistance * 1.5 + (distance - pullDistance * 2) / 4
			}
		}

		return Math.round(distance)
	}

	const checkPosition = (event) => {
		if (reachTop) {
			resetDuration()
			touch.start(event)
		}
	}

	const updateStatus = (distance, isLoading) => {
		if (isLoading) {
			setStatus(STATUS_LOADING)
		} else if (distance === 0) {
			setStatus(STATUS_AWAITING)
		} else if (distance < pullDistance) {
			setStatus(STATUS_PULLING)
		} else {
			setStatus(STATUS_RELEASING)
		}

		setDistance(distance)
	}

	const showCompleted = useMemoizedFn(() => {
		setStatus(STATUS_COMPLETED)	

		setTimeout(() => {
			nextTick(() => {
				updateStatus(0)
			})
		}, +completedDuration)
	})

	const onTouchStart = useMemoizedFn((event) => {
		if (isTouchable()) {
			checkPosition(event)
		}
	})

	const {
		run: handleTouchMove,
	} = useThrottleFn(
		(event) => {
			if (isTouchable()) {
				touch.move(event)

				const { deltaY } = touch

				if (reachTop && deltaY >= 0 && touch.isVertical()) {
					event.preventDefault()
					updateStatus(getEaseDistance(deltaY))
				}
			}
		},
		{
			wait: 16.7
		}
	)

	const onTouchMove = useMemoizedFn((event) => {
		handleTouchMove(event)	
	})

	const onTouchEnd = useMemoizedFn((event) => {
		if (reachTop && isTouchable()) {
      durationRef.current = duration

      if (status === STATUS_RELEASING) {
        updateStatus(headHeight, true)

        onRefresh?.()
      } else {
        updateStatus(0)
      }
    }
	})

	useUpdateEffect(() => {
		if (loading) {
			updateStatus(headHeight, true)
		}else {
			showCompleted()
		}
	}, [loading])

	const getStatusText = () => {
		if (status === STATUS_PULLING) {
			return pullingText
		}

		if (status === STATUS_RELEASING) {
			return releasingText
		}

		if (status === STATUS_LOADING) {
			return loadingText
		}

		if (status === STATUS_COMPLETED) {
			return completedText
		}

		return null
	}

	return {
		transitionDuration: durationRef.current,
		status,
		distance,
		isPullingStatus,
		isReleasingStatus,
		isLoadingStatus,
		isComletedStatus,	
		getStatusText,
		onTouchStart,	
		onTouchMove,
		onTouchEnd,
	}	
}

export default usePullRefresh