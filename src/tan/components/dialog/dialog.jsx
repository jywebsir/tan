import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useImmer } from 'use-immer'
import { useMemoizedFn, useUpdateEffect } from 'ahooks'
import { isFunction, isElement, isFragment, toPromise } from '../../utils/validator'
import { withNativeProps } from '../../utils/native-props'
import { bemBlock, bemElement } from '../../utils/class-name'
import { Text } from '@tarojs/components'
import Popup from '../popup'
import Button from '../button'

const BLOCK = 'dialog'

export const Dialog = props => {
	const {
		show,
		title,
		message,
		messageAlign,
		zIndex,
		overlay,
		closeOnClickOverlay,
		transition,
		showCancelButton,
		showConfirmButton,
		confirmButtonText,
		cancelButtonText,	
		children,
		onBeforeClose,
		onClose,
		onConfirm,
		onCancel
	} = props

	const [loading, updateLoading] = useImmer({
		confirm: false,
		cancel: false
	})

	const stopLoading = useMemoizedFn(() => {
		updateLoading(draft => {
			draft.confirm = false
			draft.cancel = false
		})	
	})

	const handleClose = useMemoizedFn((action) => {
		if (isFunction(onClose)) {
			wx.nextTick(() => {
				onClose(action)
			})
		}
	})

	const onClickOverlay = useMemoizedFn(() => {
		handleClose('overlay')
	})

	const handleAction = useMemoizedFn(async (action) => {
		if (!isFunction(onBeforeClose)) {
			handleClose(action)

			return
		}

		updateLoading(draft => {
			draft[action] = true
		})	

		const value = await onBeforeClose(action)

		if (value) {
			handleClose(action)
		} else {
			stopLoading()
		}
	})

	const handleConfirm = useMemoizedFn(() => {
		if (isFunction(onConfirm)) {
			onConfirm()
		}

		handleAction('confirm')
	})

	const handleCancel = useMemoizedFn(() => {
		if (isFunction(onCancel)) {
			onCancel()
		}

		handleAction('cancel')
	})

	useUpdateEffect(() => {
		if (!show) {
			stopLoading()	
		}
	}, [show])

	return withNativeProps(
		props,
		<Popup 
			show={show}
			zIndex={zIndex}
			overlay={overlay}
			transition={transition}
			closeOnClickOverlay={closeOnClickOverlay}
			className={bemBlock(BLOCK)}
			onClose={onClickOverlay}
		>
			{
				title
				&&
				<view className={
					bemElement(BLOCK, 'header', [{isolated: !(message)}])
				}>
					{title}
				</view>
			}

			{
				children
				?
				children
				:
				(
					(isElement(message) || isFragment(message))	
					?
					mesage
					:
					<view className={
						bemElement(BLOCK, 'message', [messageAlign, {hasTitle: title}])
					}>
						<Text className={bemElement(BLOCK, 'message-text')}>{message}</Text>
					</view>
				)
			}

			{
				(showCancelButton || showConfirmButton)	
				&&
				<view className={
					classNames(
						bemElement(BLOCK, 'footer'), 
						'tan-hairline', 
						'tan-hairline--top'
					)
				}>
					{
						showCancelButton
						&&
						<Button
							loading={loading.cancel}
							className={bemElement(BLOCK, 'button', [{cancel: true}])}
							onClick={handleCancel}
						>{cancelButtonText}</Button>
					}

					{
						showConfirmButton
						&&
						<Button
							loading={loading.confirm}
							className={bemElement(BLOCK, 'button', [{confirm: true}])}
							onClick={handleConfirm}
						>{confirmButtonText}</Button>
					}
				</view>
			}
		</Popup>
	)
}

Dialog.propTypes = {
	show: PropTypes.bool,
	title: PropTypes.node,
	message: PropTypes.string,
	messageAlign: PropTypes.string,
	showCancelButton: PropTypes.bool,
	showConfirmButton: PropTypes.bool,
	closeOnClickOverlay: PropTypes.bool,
	overlay: PropTypes.bool,
	confirmButtonOpenType: PropTypes.string,
	confirmButtonText: PropTypes.string,
	cancelButtonText: PropTypes.string,
	zIndex: PropTypes.number,
	transition: PropTypes.string,
	onBeforeClose: PropTypes.func,
	onClose: PropTypes.func,
	onCancel: PropTypes.func,
	onConfirm: PropTypes.func
}

Dialog.defaultProps = {
	zIndex: 2000,
	confirmButtonText: '确认',
	cancelButtonText: '取消',
	showConfirmButton: true,
	overlay: true,
	transition: 'scale'
}