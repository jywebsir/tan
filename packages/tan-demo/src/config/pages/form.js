const pageManager = require('../../lib/page-manager')

const group = 'form'
const type = pageManager.subPageType

const calendarPageId = 'calendar'
const calendarPage = {
	id: calendarPageId,
	path: 'calendar-page'
}

const fieldPageId = 'field'
const fieldPage = {
	id: fieldPageId,
	path: 'field-page'
}

const radioPageId = 'radio'
const radioPage = {
	id: radioPageId,
	path: 'radio-page'
}

const checkboxPageId = 'checkbox'
const checkboxPage = {
	id: checkboxPageId,
	path: `${checkboxPageId}-page` 
}

const switchPageId = 'switch'
const switchPage = {
	id: switchPageId,
	path: `${switchPageId}-page`
}

const searchPageId = 'search'
const searchPage = {
	id: searchPageId,
	path: `${searchPageId}-page`
}

const uploaderPageId = 'uploader'
const uploaderPage = {
	id: uploaderPageId,
	path: `${uploaderPageId}-page`
}

const pageList = [
	// calendarPage,
	fieldPage,
	radioPage,
	checkboxPage,
	switchPage,
	searchPage,
	uploaderPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	// calendarPageId,
	fieldPageId,
	radioPageId,
	checkboxPageId,
	switchPageId,
	searchPageId,
	uploaderPageId,
	pageList
}