import { useState, useRef, useEffect } from 'react'
import { nextTick, Events } from '@tarojs/taro'
import { useMemoizedFn, useUnmount, useUpdateEffect } from 'ahooks'
import isFunction from '../../utils/is-function'
import useSysStatusBar from '../../hooks/use-sys-status-bar'

const notifyEvents = new Events()

export const openNotify = (options = {}) => {
	notifyEvents.trigger('open', options)
}

export const closeNotify = () => {
	notifyEvents.trigger('close')
}

const useNotify = (props) => {
	const [options, setOptions] = useState(props)

	const refTimer = useRef()

	const [show, setShow] = useState(false)

	const {
		statusBarHeight
	} = useSysStatusBar()

	const handleClose = useMemoizedFn(() => {
		clearTimeout(refTimer.current)

		setShow(false)

		if (isFunction(options.onClose)) {
			nextTick(options.onClose)
		}
	})

	const onOpen = useMemoizedFn((opts = {}) => {
		const mergedOptions = {
			...props,
			...opts
		}

		setOptions(mergedOptions)
		setShow(true)
	})

	useEffect(() => {
    notifyEvents.on('open', onOpen)

    return () => {
      notifyEvents.off('open', onOpen)
    }
  }, [])

	useEffect(() => {
    notifyEvents.on('close', handleClose)

    return () => {
      notifyEvents.off('close', handleClose)
    }
  }, [])

	useUpdateEffect(() => {
		if (show) {
			clearTimeout(refTimer.current)			

			if (isFunction(options.onOpened)) {
				nextTick(options.onOpened)
			}

			if (options.duration > 0 && options.duration !== Infinity) {
				refTimer.current = setTimeout(() => {
					handleClose()
				}, options.duration)
			}
		}
	}, [show])

	useUnmount(() => {
		handleClose()
	})

	return {
		show,
		statusBarHeight,
		...options
	}
}

export default useNotify