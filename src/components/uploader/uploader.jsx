import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Video } from '@tarojs/components'
import { useMemoizedFn } from 'ahooks'
import { isImageFile, chooseFile, isVideoFile } from './utils'
import { isBoolean, isPromise, isFunction, isElement } from '../../utils/validator'
import { bemBlock, bemElement } from '../../utils/class-name'
import { withNativeProps } from '../../utils/native-props'
import UploaderFile from './uploader-file'
import Icon from '../icon'
import Loading from '../loading'

const BLOCK = 'uploader'

export const Uploader = props => {
	const {
		disabled,
		multiple,
		uploadText,
		useBeforeRead,
		name,
		accept,
		fileList,
		maxSize,
		maxCount,
		deletable,
		showUpload,
		customUpload,
		previewImage,
		previewFullImage,
		imageFit,
		uploadIcon,
		sizeType,
		capture,
		compressed,
		maxDuration,
		camera,
		afterRead,
		beforeRead,
		onBeforeRead,
		onAfterRead,
		onOverSize,
		onDelete,
		onError,
		onClickPreview
	} = props

	const [lists, setLists] = useState([])
	const [isInCount, setIsInCount] = useState(true)

	const formateFileList = useMemoizedFn(() => {
		const formatedList = fileList.map((item) => {
			return new UploaderFile({
				...item
			})
		})

		setLists(formatedList)
		setIsInCount(formatedList.length < maxCount)
	})

	const getDetail = (index) => {
		return {
			name,
			index: index == null ? fileList.length : index
		}
	}

	const handleAfterRead = (file) => {
		const oversize = Array.isArray(file)
		? file.some((item) => item.size > maxSize)
		: file.size > maxSize

		if (oversize) {
			if (isFunction(onOverSize)) {
				onOverSize({file, ...getDetail()})
			}	

			return
		}

		if (isFunction(afterRead)) {
			afterRead(file, getDetail())
		}

		if (isFunction(onAfterRead)) {
			onAfterRead({
				file,
				...getDetail()
			})
		}
	}

	const handleBeforeRead = (file) => {
		let res = true	

		if (isFunction(beforeRead)) {
			res = beforeRead(file, getDetail())
		}

		if (useBeforeRead) {
			res = new Promise((resolve, reject) => {
				if (isFunction(onBeforeRead)) {
					onBeforeRead({
						file,
						...getDetail(),
						callback: (ok) => {
							ok ? resolve() : reject()
						}
					})
				}
			})
		}

		if (!res) {
			return 
		}

		if (isPromise(res)) {
			res.then(data => handleAfterRead(data || file))
		}else {
			handleAfterRead(file)
		}
	} 

	const onStartUpload = useMemoizedFn(() => {
		if (disabled) {
			return
		}

		chooseFile({
			accept,
			multiple,
			capture,
			compressed,
			maxDuration,
			sizeType,
			camera,
			maxCount: maxCount - lists.length
		}).then((res) => {
			handleBeforeRead(multiple ? res : res[0])
		}).catch((error) => {
			if (isFunction(onError)) {
				onError(error)
			}
		})
	})

	const getPreviewItem = (event) => {
		const { index } = event.currentTarget.dataset
		const item = lists[index]

		return item
	}

	const onDeleteItem = useMemoizedFn((event) => {
		const { index } = event.currentTarget.dataset

		onDelete({
			...getDetail(index),
			file: fileList[index]
		})
	})

	const onPreviewImage = useMemoizedFn((event) => {
		if (!previewFullImage) return

		const item = getPreviewItem(event)

		wx.previewImage({
			urls: lists.filter((item) => isImageFile(item)).map((item) => item.url),
			current: item.url,
			fail() {
				wx.showToast({ title: '预览图片失败', icon: 'none' })
			},
		})
	})

	const onPreviewVideo = useMemoizedFn((event) => {
		if (!previewFullImage) return

		const { index } = event.currentTarget.dataset

		wx.previewMedia({
			sources: lists
				.filter((item) => isVideoFile(item))
				.map((item) => ({
					...item,
					type: 'video',
				})),
			current: index,
			fail() {
				wx.showToast({ title: '预览视频失败', icon: 'none' })
			},
		})
	})

	const onPreviewFile = useMemoizedFn((event) => {
		const item = getPreviewItem(event)

		wx.openDocument({
			filePath: item.url,
			showMenu: true,
		})
	})

	const handleClickPreview = useMemoizedFn((event) => {
		const { index } = event.currentTarget.dataset

		const item = getPreviewItem(event)

		if (isFunction(onClickPreview)) {
			onClickPreview({
				...item,
				...getDetail(index)
			})
		}
	})

	useEffect(() => {
		formateFileList()	
	}, [fileList])

	const renderItem = (item, index) => {
		if (item.isImage) {
			return (
				<image 
					src={item.thumb || item.url}
					mode={imageFit}
					alt={item.name || `图片${index}`}
					data-index={index}
					className={bemElement(BLOCK, 'preview-image')}
					onTap={onPreviewImage}
				/>	
			)
		}

		if (item.isVideo) {
			return (
				<Video 
					src={item.url}
					title={item.name || `视频${index}`}
					poster={item.thumb}
					autoplay={item.autoplay}
					data-index={index}
					className={bemElement(BLOCK, 'preview-image')}
					onTap={onPreviewVideo}
				/>	
			)
		}

		return (
			<view 
				data-index={index}
				className={bemElement(BLOCK, 'preview-file')}
				onTap={onPreviewFile}
			>
				<Icon 
					name="description" 
					className={bemElement(BLOCK, 'preview-file-icon')} 
				/>

				<view 
					data-index={index}
					className={classNames(
						bemElement(BLOCK, 'preview-file-name'), 
						'tan-ellipsis'
					)}
					onTap={onPreviewFile}
				>{item.name || item.url}</view>
			</view>
		)
	}

	return withNativeProps(
		props,
		<view className={bemBlock(BLOCK)}>
			<view className={bemElement(BLOCK, 'wrapper')}>
				{
					previewImage
					&&
					lists.map((item, index) => {
						return (
							<view
								key={index}
								data-index={index}
								className={bemElement(BLOCK, 'preview')}
								onTap={handleClickPreview}
							>
								{renderItem(item, index)}

								{
									(item.isUploading || item.isFailed)
									&&
									<view className={bemElement(BLOCK, 'mask')}>
										{
											item.isFailed
											?
											<Icon name="close" className={bemElement(BLOCK, 'mask-icon')} />
											:
											<Loading className={bemElement(BLOCK, 'loading')} />
										}

										{
											item.message
											&&
											<text className={bemElement(BLOCK, 'mask-message')}>{item.message}</text>
										}
									</view>
								}

								{
									deletable
									&&
									item.deletable
									&&
									<view
										data-index={index}
										className={bemElement(BLOCK, 'preview-delete')}
										onTap={onDeleteItem}
									>
										<Icon 
											name="cross" 
											className={bemElement(BLOCK, 'preview-delete-icon')} 
										/>
									</view>
								}
							</view>
						)
					})
				}

				{
					isInCount
					&&
					showUpload
					&&
					(
						isElement(customUpload)
						?
						<view 
							className={bemElement(BLOCK, 'custom-upload')}
							onTap={onStartUpload}
						>
							{customUpload}
						</view>
						:
						<view 
							className={bemElement(BLOCK, 'upload', {disabled})}
							hoverClass={bemElement(BLOCK, 'upload-hover')}
							onTap={onStartUpload}
						>
							<Icon name={uploadIcon} className={bemElement(BLOCK, 'upload-icon')} />

							{
								uploadText
								&&
								<text className={bemElement(BLOCK, 'upload-text')}>{uploadText}</text>
							}
						</view>
					)
				}
			</view>
		</view>
	)
}

Uploader.propTypes = {
	uploadText: PropTypes.string,
	name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	accept: PropTypes.oneOf(['all', 'media', 'image', 'file', 'video']),
	fileList: PropTypes.array,
	maxSize: PropTypes.number,
	maxCount: PropTypes.number,
	deletable: PropTypes.bool,	
	showUpload: PropTypes.bool,
	previewImage: PropTypes.bool,
	previewFullImage: PropTypes.bool,
	imageFit: PropTypes.string,
	uploadIcon: PropTypes.string,
	customUpload: PropTypes.element,
	sizeType: PropTypes.arrayOf(PropTypes.oneOf(['original', 'compressed'])),
	capture: PropTypes.arrayOf(PropTypes.oneOf(['album', 'camera'])),
	maxDuration: PropTypes.number,
	camera: PropTypes.string,
	disabled: PropTypes.bool,
	multiple: PropTypes.bool,
	useBeforeRead: PropTypes.bool,
	compressed: PropTypes.bool,
	afterRead: PropTypes.func,
	beforeRead: PropTypes.func,
	onBeforeRead: PropTypes.func,
	onAfterRead: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	onOverSize: PropTypes.func,
	onError: PropTypes.func,
	onClickPreview: PropTypes.func
}

Uploader.defaultProps = {
	accept: 'image',
	fileList: [],
	maxSize: Number.MAX_VALUE,
	maxCount: 100,
	deletable: true,
	showUpload: true,
	previewImage: true,
	previewFullImage: true,
	imageFit: 'scaleToFill',
	uploadIcon: 'photograph',
	sizeType: ['original', 'compressed'],
	capture: ['album', 'camera'],
	compressed: true,
	maxDuration: 60,
	camera: 'back'
}