const pageManager = require('../../lib/page-manager')

const group = 'form'
const type = pageManager.subPageType

const calendarPageId = 'calendar'

const calendarPage = {
	id: calendarPageId,
	path: 'calendar-page'
}

const pageList = [
	calendarPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	calendarPageId,
	pageList
}