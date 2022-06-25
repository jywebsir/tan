import Taro from '@tarojs/taro'
import System from './system'
import { isPromise, isPlainObject } from './validator'

export function canIUseNextTick() {
  return wx.canIUse('nextTick')
}

export function nextTick(cb) {
  if (canIUseNextTick()) {
    wx.nextTick(cb)
  } else {
    setTimeout(() => {
      cb();
    }, 1000 / 30)
  }
}

export function requestAnimationFrame(cb) {
  const systemInfo = System.getSystemInfoSync()

  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      cb()
    }, 1000 / 30)
  }

  return wx
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb()
    })
}

export function toPromise(value) {
	if (isPromise(value)) {
		return value
	}

	return Promise.resolve(value)
}

export function pickExclude(obj, keys) {
  if (!isPlainObject(obj)) {
    return {}
  }

  return Object.keys(obj).reduce((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key]
    }

    return prev
  }, {})
}

export function getBoundingClientRect(selector, callback) {
	Taro.nextTick(() => {
		Taro.createSelectorQuery().select(selector).boundingClientRect(callback).exec()
	})
}