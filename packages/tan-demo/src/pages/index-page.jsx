import { useMemoizedFn } from 'ahooks'
import router from '../lib/router'
// import {
// 	buttonPageId,
// 	cellPageId,
// 	iconPageId,
// 	layoutPageId,
// 	popupPageId,
// 	imagePageId,
// 	toastPageId,
// 	transitionPageId,
// } from '../config/pages/basic'

// import {
// 	// calendarPageId,
// 	fieldPageId,
// 	radioPageId,
// 	checkboxPageId,
// 	switchPageId,
// 	searchPageId,
// 	uploaderPageId
// } from '../config/pages/form'

// import {
// 	loadingPageId,
// 	notifyPageId,
// 	dialogPageId,
// 	overlayPageId,
// 	dropdownMenuId,
// 	pullRefreshPageId
// } from '../config/pages/feedback'

// import {
// 	indexBarPageId,
// 	tabsPageId,
// 	navBarPageId,
// 	tabBarPageId
// } from '../config/pages/navigation'

// import {
// 	collapsePageId,
// 	dividerPageId,
// 	processPageId,
// 	skeletonPageId,
// 	countDownPageId,
// 	emptyPageId,
// 	stickyPageId
// } from '../config/pages/presentation'

import { View } from '@tarojs/components'
import DemoPage from '../components/demo-page'
import { Space } from 'tan'

const IndexPage = () => {
	// const onClickCell = useMemoizedFn((event) => {
	// 	const { page } = event.currentTarget.dataset

	// 	router.toPage({page})	
	// })

	return (
		<DemoPage>
			<Space>
				<View>Hello</View>
				<View>World</View>
			</Space>
		</DemoPage>	
	)
}

export default IndexPage