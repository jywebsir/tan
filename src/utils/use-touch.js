import { useRef } from 'react'

const MIN_DISTANCE = 10

export const DIRECTION_HORIZONTAL = 'horizontal'
export const DIRECTION_VERTICAL = 'vertical'

const getDirection = (x, y) => {
	if (x > y && x > MIN_DISTANCE) {
    return DIRECTION_HORIZONTAL
  }

  if (y > x && y > MIN_DISTANCE) {
    return DIRECTION_VERTICAL
  }
}

const useTouch = () => {
	const touchRef = useRef({
		direction: undefined,
		startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    offsetX: 0,
    offsetY: 0,
	})

	touchRef.current.isVertical = () => {
		return touchRef.current.direction === DIRECTION_VERTICAL
	}

	touchRef.current.isHorizontal = () => {
		return touchRef.current.direction === DIRECTION_HORIZONTAL
	}

	touchRef.current.reset = () => {
		touchRef.current.deltaX = 0
    touchRef.current.deltaY = 0
    touchRef.current.offsetX = 0
    touchRef.current.offsetY = 0
    touchRef.current.direction = undefined
	}

	touchRef.current.start = (event) => {
		touchRef.current.reset(0)
		touchRef.current.startX = event.touches[0].clientX
		touchRef.current.startY = event.touches[0].clientY
	}

	touchRef.current.move = (event) => {
		const touch = event.touches[0]

		touchRef.current.deltaX = touch.clientX < 0 ? 0 : touch.clientX - touchRef.current.startX
    touchRef.current.deltaY = touch.clientY - touchRef.current.startY
    touchRef.current.offsetX = Math.abs(touchRef.current.deltaX)
    touchRef.current.offsetY = Math.abs(touchRef.current.deltaY)

    if (!touchRef.current.direction) {
      touchRef.current.direction = getDirection(touchRef.current.offsetX, touchRef.current.offsetY)
    }
	}	

	return touchRef.current
}

export default useTouch