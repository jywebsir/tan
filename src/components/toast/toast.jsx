import { useContext } from 'react'
import PropTypes from 'prop-types'
import { useMemoizedFn } from 'ahooks'
import { RichText, Text } from '@tarojs/components'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Overlay from '../overlay'
import Loading from '../loading'
import Icon from '../icon'
import Transition from '../transition'

const BLOCK = 'toast'

export const Toast = props => {
	const { 
		show, 
		mask, 
		message,
		forbidClick,
		zIndex,
		type,
		loadingType,
		position,
		children
	} = props

	const contentStyle = mask ? {'--background-color': 'transparent'} : {}
	const isText = type === 'text' || type === 'html'

	const renderContent = useMemoizedFn(() => {
		if (type === 'text')  {
			return <Text>{message}</Text>
		}

		if (type === 'html') {
			return <RichText nodes={message} />
		}

		return (
			<>
				{
					type === 'loading'
					?
					<Loading type={loadingType} className={bemElement(BLOCK, 'loading')} />
					:
					<Icon name={type} className={bemElement(BLOCK, 'icon')} />
				}

				{
					message
					&&
					<Text className={bemElement(BLOCK, 'text')}>{message}</Text>
				}
			</>
		)
	})

	const content = withNativeProps(
		props,
		<Transition 
			show={show} 
			zIndex={zIndex}
			style={contentStyle}
			className={bemElement(BLOCK, 'container')}
		>
			<view 
				className={bemBlock(
					BLOCK, 
					[
						position, 
						{'text': isText, 'icon': !isText}
					]
				)}
				catchMove
			>
				{renderContent()}

				{children}
			</view>
		</Transition>
	)

	return (
		<>
			{
				(mask || forbidClick) 
				&& 
				<Overlay className={bemElement(BLOCK, 'overlay')} />
			}

			{content}
		</>
	)
}

Toast.propTypes = {
	show: PropTypes.bool,
	mask: PropTypes.bool,
	message: PropTypes.string,
	forbidClick: PropTypes.bool,
	zIndex: PropTypes.number,
	type: PropTypes.oneOf([
		'text', 
		'html', 
		'loading', 
		'success', 
		'fail'
	]),
	loadingType: PropTypes.string,
	position: PropTypes.string
}

Toast.defaultProps = {
	show: false,
	type: 'text',
	zIndex: 1000,
	loadingType: 'circular',
	position: 'middle'
}
