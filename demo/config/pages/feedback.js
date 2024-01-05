const pageManager = require('../../lib/page-manager')

const group = 'feedback'
const type = pageManager.subPageType

const loadingPage = {
	id: 'loading',
	path: 'loading-page'
}

const notifyPage = {
	id: 'notify',
	path: 'notify-page'
}

const pageList = [
	loadingPage,
	notifyPage
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