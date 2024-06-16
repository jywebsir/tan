let systemInfo = null

export const getSystemInfoSync = () => {
	if (!systemInfo) {
		systemInfo = wx.getSystemInfoSync()
	}

	return systemInfo
}

export const getStatusBarHeight = () => {
	const info = getSystemInfoSync()

	return info.statusBarHeight
}

export const isIosClient = () => {
	const info = getSystemInfoSync()	

	return info.system.includes('iOS')
}

export const getWindowHeight = () => {
	const info = getSystemInfoSync()	

	return info.windowHeight
}
