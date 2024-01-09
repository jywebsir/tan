import { useState, useRef, useEffect } from 'react'
import { nextTick, Events } from '@tarojs/taro'
import { useMemoizedFn, useUnmount, useUpdateEffect } from 'ahooks'
import { NotifyOptions } from './notify.type'
import useSysStatusBar from '../../hooks/use-sys-status-bar'

const notifyEvents = new Events()

export const openNotify = (options: NotifyOptions = {}) => {
	notifyEvents.trigger('open', options)
}

export const closeNotify = () => {
	notifyEvents.trigger('close')
}

function createOptions(options: NotifyOptions) {
	const {
		type = 'danger',
		color = '#FFFFFF',
		message = '',
		background = '',
		duration = 3000,
		safeAreaInsetTop = false,
		onClick,
		onOpened,
		onClose
	} = options

	return {
		type,
		color,
		background,
		message,
		duration,
		safeAreaInsetTop,
		onClick,
		onOpened,
		onClose
	}
}

const useNotify = (props: NotifyOptions) => {
	const [options, setOptions] = useState(() => {
		return createOptions(props)
	})

	const refTimer = useRef<NodeJS.Timeout>()

	const [show, setShow] = useState(false)

	const {
		statusBarHeight
	} = useSysStatusBar()

	const handleClose = useMemoizedFn(() => {
		if (refTimer.current) {
			clearTimeout(refTimer.current)
		}

		setShow(false)

		if (!!options.onClose) {
			nextTick(options.onClose)
		}
	})

	const onOpen = useMemoizedFn((opts: NotifyOptions = {}) => {
		const mergedOptions: NotifyOptions = {
			...props,
			...opts
		}

		setOptions(createOptions(mergedOptions))
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
			if (refTimer.current) {
				clearTimeout(refTimer.current)			
			}

			if (!!options.onOpened) {
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