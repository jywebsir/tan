import { useImperativeHandle, useRef } from 'react'
import { useUnmount, useSafeState, useUpdateEffect, useMount } from 'ahooks'
import { isFunction } from '../../utils/validator'
import {
	simpleTick,
	isSameSecond,
	parseFormat,
	parseTimeData	
} from './utils'

const useCountDown = props => {
	const {
		ref,
		millisecond,
		time,
		format,
		autoStart,
		onChange,
		onFinish
	} = props	

	const tidRef = useRef()
	const countingRef = useRef(false)
	const remainRef = useRef(time)
	const endTimeRef = useRef(null)

	const [formattedTime, setFormattedTime] = useSafeState(null)

	const getCurrentRemain = () => {
		return Math.max(endTimeRef.current - Date.now(), 0)
	}

	const clearTimeoutId = () => {
		if (tidRef.current) {
			clearTimeout(tidRef.current)
		}	
	}

	const updateRemain = (remain) => {
		remainRef.current = remain

		const timeData = parseTimeData(remain)

		if (isFunction(onChange)) {
			onChange(timeData)
		}else {
			setFormattedTime(parseFormat(format, timeData))
		}

		if (remain === 0) {
			pause()
			onFinish?.()
		}
	}

	const microTick = () => {
		tidRef.current = simpleTick(() => {
			const currentRemain = getCurrentRemain()

			updateRemain(currentRemain)

			if (currentRemain !== 0) {
				microTick()
			}
		})	
	}

	const macroTick = () => {
		tidRef.current = simpleTick(() => {
			const currentRemain = getCurrentRemain()

			if (!isSameSecond(currentRemain, remainRef.current) || currentRemain === 0) {
				updateRemain(currentRemain)
			}

			if (currentRemain !== 0) {
				macroTick()
			}
		})		
	}

	const tick = () => {
		if (millisecond) {
			microTick()	
		}else {
			macroTick()
		}
	}

	const start = () => {
		if (countingRef.current) {
			return
		}

		countingRef.current = true
		endTimeRef.current = Date.now() + remainRef.current
		tick()
	}

	const pause = () => {
		countingRef.current = false

		clearTimeoutId()
	}

	const reset = () => {
		pause()	
		updateRemain(time)

		if (autoStart) {
			start()
		}
	}

	useImperativeHandle(ref, () => {
		return {
			start,
			pause,
			reset
		}
	})

	useMount(() => {
		if (autoStart) {
			start()
		}
	})

	useUnmount(() => {
		clearTimeoutId()

		tidRef.current = null	
	})

	return {
		formattedTime
	}
}

export default useCountDown 