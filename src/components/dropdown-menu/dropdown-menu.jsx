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
import { useImmer } from 'use-immer'
import { useMount, useUnmount, useMemoizedFn } from 'ahooks'
import { withNativeProps } from '../../utils/native-props'
import uniqueId from '../../utils/unique-id'
import reject from '../../utils/collection/reject'
import { getWindowHeight } from '../../utils/system'
import { addUnit } from '../../utils/unit'
import { bemBlock, bemElement } from '../../utils/class-name'
import { getElementRect } from '../../utils/element'
import DropdownMenuItem from './dropdown-menu-item'

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

let MENU_LIST = []
export const BLOCK = 'dropdown-menu'

export const DropdownMenu = props => {
	const {
		direction,
		activeColor,
		overlay,	
		zIndex,
		duration,
		closeOnClickOverlay,
		closeOnClickOutside,
		children
	} = props

	const menuRef = useRef()
	const idRef = useRef(uniqueId('tan-dropdown-menu'))
	const winHeightRef = useRef(getWindowHeight())

	const [itemListData, updateItemListData] = useImmer([])
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
			wrapperStyle.bottom = ddUnit(offset)
		}

		return wrapperStyle
	})

	const handleClose = useMemoizedFn(() => {
		itemRefs.forEach((itemRef) => {
			itemRef.current.toggle(false, true)
		})	
	})

	const onUpdateData = useMemoizedFn((itemIndex, {
		value,
		title,
		showPopup,
		disabled,
		options
	} = {}) => {
		updateItemListData(draft => {
			draft[itemIndex] = {
				value,
				title,
				showPopup,
				disabled,
				options	
			}
		})
	})

	const onTapMenuItem = useMemoizedFn((event) => {
		const { index, disabled } = event.currentTarget.dataset

		if (!disabled) {
			MENU_LIST.forEach((menu) => {
				if (
					menu.id 
					&& 
					menu.closeOnClickOutside
					&&
					menu.id !== idRef.current
				) {
					menu.handleClose()
				}
			})	

			itemRefs[index].current.toggle()			
		}
	})

	useMount(() => {
		MENU_LIST.push({
			id: idRef.current, 
			closeOnClickOutside,
			handleClose
		})
	})

	useUnmount(() => {
		MENU_LIST = reject(MENU_LIST, (menu) => {
			return menu.id === idRef.current
		})
	})

	useEffect(() => {
		const result = getItems(children, {
			activeColor,
			overlay,
			duration,
			direction,
			closeOnClickOverlay,
			getWrapperStyle,
			onUpdateData,
		})

		setItemRefs(result.itemRefs)		
		setItems(result.children)
	}, [
		children,
		activeColor,
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
			{
				itemListData.length > 0
				&&
				itemListData.map((item, index) => {
					return (
						<DropdownMenuItem 
							key={item.value}
							data-index={index}
							data-disabled={item.disabled}
							activeColor={activeColor}
							direction={direction}
							{...item}	
							onClick={onTapMenuItem}
						/>
					)
				})
			}
			{items}
		</view>
	)
}

DropdownMenu.propTypes = {
	direction: PropTypes.oneOf(['top', 'down']),
	activeColor: PropTypes.string,
	overlay: PropTypes.bool,
	zIndex: PropTypes.number,
	duration: PropTypes.number,
	closeOnClickOverlay: PropTypes.bool,
	closeOnClickOutside: PropTypes.bool	
} 

DropdownMenu.defaultProps = {
	direction: 'down',
	overlay: true,
	zIndex: 10,
	duration: 200,
	closeOnClickOverlay: true,
	closeOnClickOutside: true
}

