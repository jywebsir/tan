import {
  pageMap,
  mainPageList,
  subPageList,
  preloadPageList
} from './config/pages'

export default {
  entryPagePath: pageMap.entry,
  pages: mainPageList,
	subpackages: subPageList,
	preloadRule: preloadPageList,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: 'Tan',
    navigationBarTextStyle: 'black'
  }
}
