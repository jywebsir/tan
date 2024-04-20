const pageManager = require('../../lib/page-manager')

const group = 'navigation'
const type = pageManager.subPageType

const indexBarPageId = 'index-bar'
const indexBarPage = {
	id: indexBarPageId,
	path: `${indexBarPageId}-page`
}

const tabsPageId = 'tabs'
const tabsPage = {
	id: tabsPageId,
	path: `${tabsPageId}-page`
}

const navBarPageId = 'nav-bar'
const navBarPage = {
	id: navBarPageId,
	path: `${navBarPageId}-page` 
}

const tabBarPageId = 'tabbar'
const tabBarPage = {
	id: tabBarPageId,
	path: `${tabBarPageId}-page` 
}

const pageList = [
	indexBarPage,
	tabsPage,
	navBarPage,
	tabBarPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	indexBarPageId,
	tabsPageId,	
	navBarPageId,
	tabBarPageId, 
	pageList
}