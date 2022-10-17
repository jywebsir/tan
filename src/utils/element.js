import Taro from '@tarojs/taro'

export const elementUnref = (elementOrRef) => {
  if (elementOrRef === undefined || elementOrRef === null) {
    return elementOrRef
  }

	if (elementOrRef.hasOwnProperty('current')) {
		return elementOrRef.current
	}

  return elementOrRef
}

export const queryNodesRef = (element) => {
  return Taro.createSelectorQuery().select(`#${element.uid}`)
}

export const queryAllNodesRef = (element, selector) => {
  return Taro.createSelectorQuery().selectAll(`#${element.uid} ${selector}`)
}

export const getElementRect = (elementOrRef) => {
	const element = elementUnref(elementOrRef)

	if (!element) {
		return Promise.reject('获取节点失败')
	}

	return new Promise((resolve) => {
		queryNodesRef(element)
			.boundingClientRect()
			.exec(([rect]) => {
				resolve(rect)
			})
	})
}

export const getElementRectsBySelector = (elementOrRef, selector) => {
	if (!selector) {
		return Promise.reject('选择器不能为空')
	}

	const element = elementUnref(elementOrRef)

	if (!element) {
		return Promise.reject('获取节点失败')
	}

	return new Promise((resolve) => {
		queryAllNodesRef(element, selector)
			.boundingClientRect()
			.exec(([rects]) => {
				resolve(rects)
			})
	})
}