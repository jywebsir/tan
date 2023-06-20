const map = {
	entry: 'index-page',
	icon: 'icon-page',
	row: 'row-page',
	cell: 'cell-page',
	loading: 'loading-page',
	button: 'button-page',
	navbar: 'nav-bar-page',
	image: 'image-page',
	field: 'field-page',
	empty: 'empty-page',
	transition: 'transition-page',
	overlay: 'overlay-page',
	toast: 'toast-page',
	popup: 'popup-page',
	dialog: 'dialog-page',
	collapse: 'collapse-page',
	search: 'search-page',
	tabbar: 'tabbar-page',
	uploader: 'uploader-page',
	sticky: 'sticky-page',
	carousel: 'carousel-page',
	indexBar: 'index-bar-page',
	dropdownMenu: 'dropdown-menu-page',
	radio: 'radio-page',
	checkbox: 'checkbox-page',
	switch: 'switch-page',
	countDown: 'count-down-page',
	divider: 'divider-page',
	progress: 'progress-page',
	tabs: 'tabs-page',
	pullRefresh: 'pull-refresh-page',
	skeleton: 'skeleton-page'
}

const list = Object.keys(map).map((key) => {
  return `pages/${map[key]}`
})

module.exports = {
	map,
	list	
}