const pageManager = require('../../lib/page-manager')

const group = 'feedback'
const type = pageManager.subPageType

const loadingPage = {
	id: 'loading',
	path: 'loading-page'
}

const pageList = [
	loadingPage
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