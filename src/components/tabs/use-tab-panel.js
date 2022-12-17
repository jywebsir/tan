import { useContext, useRef } from 'react'
import TabsContext from './tabs-context'

const useTabPanel = props => {
	const initedRef = useRef()

	const { index } = props

	const {
		currentIndex,
		lazyRender,
		animated
	} = useContext(TabsContext)

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