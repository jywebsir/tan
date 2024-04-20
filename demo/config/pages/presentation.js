const pageManager = require('../../lib/page-manager')

const group = 'presentation'
const type = pageManager.subPageType

const collapsePageId = 'collapse'
const collapsePage = {
	id: collapsePageId,
	path: `${collapsePageId}-page` 
}

const dividerPageId = 'divider'
const dividerPage = {
	id: dividerPageId,
	path: `${dividerPageId}-page` 
}

const processPageId = 'progress'
const processPage = {
	id: processPageId,
	path: `${processPageId}-page` 
}

const skeletonPageId = 'skeleton'
const skeleteonPage = {
	id: skeletonPageId,
	path: `${skeletonPageId}-page`
}

const countDownPageId = 'count-down'
const countDownPage = {
	id: countDownPageId,
	path: `${countDownPageId}-page` 
}

const emptyPageId = 'empty'
const emptyPage = {
	id: emptyPageId,
	path: `${emptyPageId}-page` 
}

const stickyPageId = 'sticky'
const stickyPage = {
	id: stickyPageId,
	path: `${stickyPageId}-page`
}

const pageList = [
	collapsePage,
	dividerPage,
	processPage,
	skeleteonPage,
	countDownPage,
	emptyPage,
	stickyPage
].map((page) => {
	return {
		...page,
		type,
		group
	}
})

module.exports = {
	group,
	collapsePageId,
	dividerPageId,
	processPageId,
	skeletonPageId,
	countDownPageId,
	emptyPageId,
	stickyPageId,
	pageList
}