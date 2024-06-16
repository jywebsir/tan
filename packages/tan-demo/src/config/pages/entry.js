const pageManager = require('../../lib/page-manager')

const entryPage = {
	id: 'entry',
	type: pageManager.mainPageType,
	path: 'index-page'
}

const pageList = [
	entryPage
]

module.exports = {
	pageList
}