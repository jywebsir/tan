import { useContext, useRef } from 'react'

const useTabPanel = props => {
	const initedRef = useRef()

	const { 
		index,
		currentIndex,
		lazyRender,
		animated
	} = props

	const actived = currentIndex === index

	initedRef.current = initedRef.current || actived

	const shouldRender = initedRef.current || !lazyRender
	const show = actived || animated

	return {
		actived,
		shouldRender,
		show
	}
}

export default useTabPanel