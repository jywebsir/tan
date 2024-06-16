import React from 'react'
import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import Button from '../button'
import Icon from '../icon'
import Flex from '../flex'

const onBackTop = () => {
	Taro.pageScrollTo({
		scrollTop: 0
	})
}

const BLOCK = 'back-top'

export const BackTop = props => {
	const { show, showText } = props

	return withNativeProps(
		props,
		<Button 
			className={bemBlock(BLOCK, {show})}
			round
			onClick={onBackTop}
		>
			<Flex direction="vertical" className={bemElement(BLOCK, 'content')}>
				<Icon name="arrow-up" className={bemElement(BLOCK, 'icon')} />

				{
					showText
					&&
					<view 
						className={bemElement(BLOCK, 'text')}
					>{props.children || '顶部'}</view>
				}
			</Flex>
		</Button>
	)
}

BackTop.propTypes = {
	show: PropTypes.bool,
	showText: PropTypes.bool
} 

BackTop.defaultProps = {
	show: false,
	showText: true
}


