const pageManager = require('../../lib/page-manager')

const entry = require('./entry')
const basic = require('./basic')
const feedback = require('./feedback')
const navigation = require('./navigation')

// 页面列表
const pageList = [
	...entry.pageList,
	...basic.pageList,
	...feedback.pageList,
	...navigation.pageList
]

// 页面映射表
const pageMap = pageManager.getPageMap(pageList)

// 主包页面列表
const mainPageList = pageManager.getMainPageList(pageMap, pageList)

// 分包页面列表
const subPageList = pageManager.getSubPageList(pageList)

// 预加载页面列表
const NETWORK_ALL = 'all'
const preloadPageList = {
	[pageMap.entry]: {
		network: NETWORK_ALL,
		packages: [
			`${pageManager.subPageFold}/${basic.group}`,
			`${pageManager.subPageFold}/${feedback.group}`,
			`${pageManager.subPageFold}/${navigation.group}`,
		]
	}
}

module.exports = {
	pageMap,
	mainPageList,
	subPageList,
	preloadPageList
}
