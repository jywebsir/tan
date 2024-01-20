const pageManager = require('../../lib/page-manager')

const group = 'basic'
const type = pageManager.subPageType

const iconPageId = 'icon'
const iconPage = {
	id: iconPageId
}

const cellPageId = 'cell'
const cellPage = {
	id: cellPageId,
}

const buttonPageId = 'button'
const buttonPage = {
	id: buttonPageId
}

const pageList = [
	iconPage,
	cellPage,
	buttonPage
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
	iconPageId,
	cellPageId,
	buttonPageId
}