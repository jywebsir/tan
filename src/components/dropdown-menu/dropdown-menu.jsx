import React, { 
	Children, 
	isValidElement, 
	createRef, 
	cloneElement,
	useEffect, 
	useRef, 
	useState
} from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import uniqueId from '../../utils/unique-id'
import reject from '../../utils/collection/reject'
import { getWindowHeight } from '../../utils/system'
import { addUnit } from '../../utils/unit'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getElementRect } from '../../utils/element'

const getItems = (children, menuProps = {}) => {
	const result = {
		children: [],
		itemRefs: []
	}

	Children.forEach(children, (child, index) => {
		if (!isValidElement(child)) {
			return 
		}

    const { props } = child
    const childrenProp = props.children

		const itemRef = createRef()

		result.itemRefs.push(itemRef)

		result.children.push(cloneElement(child, {
			ref: itemRef,
			index,
			...menuProps,
			...props
		}))
	})

	return result
}

export const BLOCK = 'dropdown-menu'

export const DropdownMenu = props => {
	const {
		direction,
		overlay,	
		zIndex,
		duration,
		closeOnClickOverlay,
		children
	} = props

	const menuRef = useRef()
	const winHeightRef = useRef(getWindowHeight())

	const [itemRefs, setItemRefs] = useState([])
	const [items, setItems] = useState([])

	const getWrapperStyle = useMemoizedFn(async () => {
		const wrapperStyle = { zIndex }

		const rect = await getElementRect(menuRef)

		const { top = 0, bottom = 0 } = rect
		const offset = direction === 'down' ? bottom : winHeightRef.current - top;

		if (direction === 'down') {
			wrapperStyle.top = addUnit(offset)
		} else {
			wrapperStyle.bottom = addUnit(offset)
		}

		return wrapperStyle
	})

	const handleCloseItems = useMemoizedFn((activedIndex = null) => {
		itemRefs.forEach((itemRef, idx) => {
			if (activedIndex !== null) {
				if (idx !== activedIndex) {
					itemRef.current.toggle(false, true)
				}
			}else {
				itemRef.current.toggle(false, true)
			}
		})	
	})

	useEffect(() => {
		const result = getItems(children, {
			overlay,
			duration,
			direction,
			closeOnClickOverlay,
			handleCloseItems,
			getWrapperStyle
		})

		setItemRefs(result.itemRefs)		
		setItems(result.children)
	}, [
		children,
		direction,
		overlay,
		duration,
		closeOnClickOverlay
	])

	return withNativeProps(
		props,
		<view 
			ref={menuRef} 
			className={bemBlock(BLOCK)}
		>
			{items}
		</view>
	)
}

DropdownMenu.propTypes = {
	direction: PropTypes.oneOf(['top', 'down']),
	overlay: PropTypes.bool,
	zIndex: PropTypes.number,
	duration: PropTypes.number,
	closeOnClickOverlay: PropTypes.bool,
} 

DropdownMenu.defaultProps = {
	direction: 'down',
	overlay: true,
	zIndex: 10,
	duration: 200,
	closeOnClickOverlay: true
}

