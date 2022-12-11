import PropTypes from 'prop-types'
import usePropsValue from '../../hooks/use-props-value'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Loading from '../loading'

const BLOCK = 'switch'

export const Switch = props => {
	const {
		loading,
		disabled,
		activeValue,
		inactiveValue,
		onChange
	} = props

	const [value, setValue] = usePropsValue({
		value: props.value,
		defaultValue: props.defaultValue,
		onChange
	})

	const actived = value === activeValue

	const onClick = () => {
		if (disabled || loading) {
			return
		}

		if (actived) {
			setValue(inactiveValue)
		}else {
			setValue(activeValue)
		}
	}

	return withNativeProps(
		props,
		<view 
			className={bemBlock(
				BLOCK, 
				{on: value === activeValue, disabled}
			)}
			onTap={onClick}
		>
			<view className={bemElement(BLOCK, 'node')}>
				{
					loading
					&&
					<Loading 
						className={bemElement(BLOCK, 'loading', {actived})} 
					/>
				}
			</view>
		</view>	
	)
}

Switch.propTypes = {
	value: PropTypes.node,
	defaultValue: PropTypes.node,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	activeValue: PropTypes.node,
	inactiveValue: PropTypes.node
} 

Switch.defaultProps = {
	loading: false,
	disabled: false,
	activeValue: true,
	inactiveValue: false
}
