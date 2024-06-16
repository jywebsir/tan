const pageManager = require('../../lib/page-manager')

const group = 'feedback'
const type = pageManager.subPageType

const loadingPageId = 'loading'
const loadingPage = {
	id: loadingPageId,
	path: `${loadingPageId}-page`
}

const notifyPageId = 'notify'
const notifyPage = {
	id: notifyPageId,
	path: `${notifyPageId}-page`
}

const dialogPageId = 'dialog'
const dialogPage = {
	id: dialogPageId,
	path: `${dialogPageId}-page`
}

const overlayPageId = 'overlay'
const overlayPage = {
	id: overlayPageId,
	path: `${overlayPageId}-page` 
}

const dropdownMenuId = 'dropdown-menu'
const dropdownMenuPage = {
	id: dropdownMenuId,
	path: `${dropdownMenuId}-page` 
}

const pullRefreshPageId = 'pull-refresh'
const pullRefreshPage = {
	id: pullRefreshPageId,
	path: `${pullRefreshPageId}-page` 
}

const pageList = [
	loadingPage,
	notifyPage,
	dialogPage,
	overlayPage,
	dropdownMenuPage,
	pullRefreshPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	loadingPageId,
	notifyPageId,	
	dialogPageId,
	overlayPageId,
	dropdownMenuId,
	pullRefreshPageId,
	pageList
}