const pageManager = require('../../lib/page-manager')

const group = 'navigation'
const type = pageManager.subPageType

const indexBarPage = {
	id: 'index-bar',
	path: 'index-bar-page'
}

const pageList = [
	indexBarPage
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