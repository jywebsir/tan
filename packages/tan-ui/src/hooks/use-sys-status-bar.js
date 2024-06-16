import { useMemo } from 'react'
import { getStatusBarHeight } from '../utils/system'

const useSysStatusBar = () => {
	const statusBarHeight = useMemo(() => {
		return getStatusBarHeight()
	}, [])

	return {
		statusBarHeight
	}
}

export default useSysStatusBar