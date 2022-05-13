const map = {
	entry: 'index-page',
	icon: 'icon-page',
	row: 'row-page',
	cell: 'cell-page',
	loading: 'loading-page',
	button: 'button-page',
	navbar: 'nav-bar-page',
	image: 'image-page'
}

const list = Object.keys(map).map((key) => {
  return `pages/${map[key]}`
})

module.exports = {
	map,
	list	
}