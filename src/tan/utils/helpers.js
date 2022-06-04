import System from './system'
import { isPromise } from './validator'

export function canIUseNextTick() {
  return wx.canIUse('nextTick');
}

export function nextTick(cb) {
  if (canIUseNextTick()) {
    wx.nextTick(cb);
  } else {
    setTimeout(() => {
      cb();
    }, 1000 / 30);
  }
}

export function requestAnimationFrame(cb) {
  const systemInfo = System.getSystemInfoSync();

  if (systemInfo.platform === 'devtools') {
    return setTimeout(() => {
      cb();
    }, 1000 / 30);
  }

  return wx
    .createSelectorQuery()
    .selectViewport()
    .boundingClientRect()
    .exec(() => {
      cb();
    });
}

export function toPromise(value) {
	if (isPromise(value)) {
		return value
	}

	return Promise.resolve(value)
}