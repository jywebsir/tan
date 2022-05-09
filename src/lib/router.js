import queryString from 'query-string'
import Taro from '@tarojs/taro'
import pages from '@/config/pages'

const WHITE_LIST = []

export class Router {
	whiteList
	pageDir

	constructor(whiteList = [], pageDir = 'pages') {
		this.whiteList = [...whiteList]
		this.pageDir = pageDir
	}

  get currentPage() {
    const pages = Taro.getCurrentPages()

    if (pages.length > 0) {
      return pages.pop()
    }

    return null
  }


  toPage({
    page, params, redirect
  }) {
    const args = params || {};

		const pageUrl = this.getPageUrl(page)

    if (redirect) {
      this.redirectTo(pageUrl, args)
    }else {
      this.navigateTo(pageUrl, args)
    }
  }

	navigateTo(url, params = {}) {
    if (this.isAllowed(url)) {
      wx.navigateTo({
        url: this.getStringifyUrl(url, params)
      })  
    }else {
			this.handleForbidden()
		}
  }

  redirectTo(url, params = {}) {
    if (this.isAllowed(url)) {
      wx.redirectTo({
        url: this.getStringifyUrl(url, params)
      })
    }else {
			this.handleForbidden()
		}
  }

	back({
		params = {}, 
		options = {}
	}) {
    if (!options.delta) {
      options.delta = 1
    }

    const paramKeys = Object.keys(params)

    if (Array.isArray(paramKeys) && paramKeys.length > 0) {
      const pages = Taro.getCurrentPages() 
      const prevPage = pages[pages.length - 2] 

      prevPage.setData({...params})
    }

    wx.navigateBack(options)
  }

	switchTo(url) {
		const pageUrl = this.getPageUrl(url)	

    wx.switchTab({url: pageUrl})
  }

  reLaunch(url) {
		const pageUrl = this.getPageUrl(url)	

    wx.reLaunch({url: pageUrl})
  }

	handleForbidden() {}

	isAllowed(url) {
    if (this.isInWhiteList(url)) {
      return true
    }

    return true
  }

  isInWhiteList(url) {
    return this.whiteList.includes(url)
  }

	isActivedPage(pageUrl) {
    const currentPage = this.currentPage

    if ( ! currentPage) {
      return false
    }

    const { route } = currentPage

    if (route === pageUrl) {
      return true
    }

    return false
  }

	getPageUrl(url) {
		return `/${this.pageDir}/${url}`
	}

	getStringifyUrl(
		url, 
		query = null, 
		fragment = null
	) {
    const options = { url }

    if (query) {
      options.query = query
    }

    if (fragment) {
      options.fragment = fragment
    }

    return queryString.stringifyUrl(options)    
  }
}

export default new Router(WHITE_LIST)