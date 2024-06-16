const mainPageType = 'main'
const subPageType = 'sub'
const mainPageFold = 'pages'
const subPageFold = 'subpages'

function getPagePath(pageItem) {
	const pagePath = pageItem.path ?? `${pageItem.id}-page`

	if (pageItem.type === subPageType) {
		if (pageItem.group) {
			return `${subPageFold}/${pageItem.group}/${pagePath}`
		}

		return `${subPageFold}/${pagePath}`
	}

	if (pageItem.group) {
		return `${mainPageFold}/${pageItem.group}/${pagePath}`
	}

	return `${mainPageFold}/${pagePath}`
}

function getPageMap(pageList) {
	const result = {}

	for (const item of pageList) {
		result[item.id] = getPagePath(item)
	}

	return result
}

function getMainPageList(pageMap, pageList) {
	const mainPageItems = pageList.filter((item) => {
		return item.type === mainPageType
	})

	if (Array.isArray(mainPageItems) && mainPageItems.length > 0) {
		return mainPageItems.map((item) => {
			return pageMap[item.id]
		})
	}

	return []
}

function getSubPageList(pageList) {
	const result = []

	const subPageItems = pageList.filter((item) => {
		return item.type === subPageType
	})	

	if (Array.isArray(subPageItems) && subPageItems.length > 0) {
		const groupedPagePaths = subPageItems.reduce((groups, page) => {
			if (!groups[page.group]) { 
				groups[page.group] = []; 
			}

			const pagePath = page.path ?? `${page.id}-page`

			groups[page.group].push(pagePath) 
	
			return groups
		}, {})

		const entries = Object.entries(groupedPagePaths)

		for (const [group, pagePaths] of entries) {
			const subPageGroup = {
				root: `${subPageFold}/${group}`,
				pages: [...pagePaths]
			}

			result.push(subPageGroup)
		}
	}	

	return result
}

module.exports = {
	mainPageType,
	subPageType,	
	subPageFold,
	mainPageFold,	
	getPageMap,
	getMainPageList,
	getSubPageList			
}
