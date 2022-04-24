const map = {
	entry: 'index-page',
	icon: 'icon-page'
}

const list = Object.keys(map).map((key) => {
  return `pages/${map[key]}`
})

module.exports = {
	map,
	list	
}