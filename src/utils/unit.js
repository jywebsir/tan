import Taro from "@tarojs/taro"

function convertPx(value) {
  value = value.replace(/px/g, "")
  return +value
}

export function convertRpx(value) {
	return Taro.pxTransform(value)
}

function convertRem(value) {
  value = value.replace(/rem/g, "")
  return +value * getRootFontSize()
}

function convertVw(value) {
  value = value.replace(/vw/g, "")
  return (+value * window.innerWidth) / 100
}

function convertVh(value) {
  value = value.replace(/vh/g, "")
  return (+value * window.innerHeight) / 100
}

export function unitToPx(value) {
  if (typeof value === "number") {
    return value
  }

  if (value.includes("rpx")) {
    return convertRpx(value)
  }
  if (value.includes("px")) {
    return convertPx(value)
  }
  if (value.includes("rem")) {
    return convertRem(value)
  }
  if (value.includes("vw")) {
    return convertVw(value)
  }
  if (value.includes("vh")) {
    return convertVh(value)
  }

  return parseFloat(value)
}

export function addUnit(value) {
  return value === undefined ? "" : `${unitToPx(value)}px`
}
