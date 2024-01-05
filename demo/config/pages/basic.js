const pageManager = require('../../lib/page-manager')

const group = 'basic'
const type = pageManager.subPageType

const iconPageId = 'icon'
const iconPage = {
	id: iconPageId,
	path: 'icon-page'
}

const pageList = [
	iconPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	pageList,
	iconPageId
}