const pageManager = require('../../lib/page-manager')

const group = 'navigation'
const type = pageManager.subPageType

const indexBarPage = {
	id: 'index-bar',
	path: 'index-bar-page'
}

const tabsPage = {
	id: 'tabs',
	path: 'tabs-page'
}

const pageList = [
	indexBarPage,
	tabsPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	pageList
}