import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement, getBlockName } from '../../utils/class-name'
import { Button } from '@tarojs/components' 
import Loading from '../loading'
import Icon from '../icon'

const BLOCK = 'button'
const BLOCK_NAME = getBlockName('button')

export const TanButton = props => {
	const {
		type,
		formType,
		icon,
		iconClassPrefix,
		plain,
		block,
		round,
		square,
		loading,
		disabled,
		hairline,
		loadingType,
		loadingText,
		size,
		lang,
		openType,
		sendMessageTitle,
		sendMessagePath,
		sendMessageImg,
		showMessageCard,
		appParameter,
		children,
		onClick,
		onGetUserInfo,
		onContact,
		onGetPhoneNumber,
		onError,
		onLaunchApp,
		onOpenSetting
	} = props	

	const blockClsName = bemBlock(BLOCK, [
		type,
		size,
		{
			block,
			round,
			plain,
			square,
			loading,
			hairline,
			disabled,
			unclickable: disabled || loading
		}
	])

	return withNativeProps(
		props,
		<Button
			className={blockClsName}
			hoverClass={`${BLOCK_NAME}--active`}
			lang={lang}
			disabled={disabled}
			formType={formType}
			openType={openType}
			sendMessageTitle={sendMessageTitle}
			sendMessagePath={sendMessagePath}
			sendMessageImg={sendMessageImg}
			showMessageCard={showMessageCard}
			appParameter={appParameter}
			onTap={onClick}
			onGetUserInfo={onGetUserInfo}
			onContact={onContact}
			onGetPhoneNumber={onGetPhoneNumber}
			onError={onError}
			onLaunchApp={onLaunchApp}
			onOpenSetting={onOpenSetting}
		>
			{
				loading
				?
				<>
					<Loading 
						type={loadingType}
						className={bemElement(BLOCK, 'loading')}	
					/>

					{
						loadingText
						&&
						<view className={bemElement(BLOCK, 'loading-text')}>
							{loadingText}
						</view>
					}
				</>
				:
				<>
					{
						icon
						&&
						(
							typeof icon === 'string'
							?
							<Icon 
								name={icon} 
								className={bemElement('icon')} 
								classPrefix={iconClassPrefix}
							/>
							:
							icon	
						)
					}

					<view className={bemElement(BLOCK, 'text')}>
						{children}
					</view>
				</>
			}
		</Button>
	)
}

TanButton.propTypes = {
	type: PropTypes.oneOf(['primary', 'info', 'warning', 'danger']),
	icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	iconClassPrefix: PropTypes.string,
	plain: PropTypes.bool,
	block: PropTypes.bool,
	round: PropTypes.bool,
	square: PropTypes.bool,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	hairline: PropTypes.bool,
	loadingType: PropTypes.string,
	loadingText: PropTypes.string,
	lang: PropTypes.string,
	size: PropTypes.oneOf(['normal', 'large', 'small', 'mini']),
	formType: PropTypes.oneOf(['submit', 'reset']),
	openType: PropTypes.string,
	appParameter: PropTypes.string,
	showMessageCard: PropTypes.bool,
	sendMessageTitle: PropTypes.string,
	sendMessagePath: PropTypes.string,
	sendMessageImg: PropTypes.string,
	dataset: PropTypes.any,
	onClick: PropTypes.func,
	onGetUserInfo: PropTypes.func,
	onContact: PropTypes.func,
	onGetPhoneNumber: PropTypes.func,
	onGetError: PropTypes.func,
	onOpenSetting: PropTypes.func,
	onError: PropTypes.func,
	onLaunchApp: PropTypes.func,
	onOpenSetting: PropTypes.func
} 

TanButton.defaultProps = {
	type: 'default',
	lang: 'en',
	size: 'normal',
	loadingType: 'circular'
}
