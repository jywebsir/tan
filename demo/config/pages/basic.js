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

const layoutPageId = 'row'
const layoutPage = {
	id: layoutPageId
}

const popupPageId = 'popup'
const popupPage = {
	id: popupPageId
}

const imagePageId = 'image'
const imagePage = {
	id: imagePageId
}

const toastPageId = 'toast'
const toastPage = {
	id: toastPageId
}

const transitionPageId = 'transition'
const transitionPage = {
	id: transitionPageId
}

const pageList = [
	iconPage,
	cellPage,
	buttonPage,
	layoutPage,
	popupPage,
	imagePage,
	toastPage,
	transitionPage	
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
	buttonPageId,
	layoutPageId,
	popupPageId,
	imagePageId,
	toastPageId,
	transitionPageId
}