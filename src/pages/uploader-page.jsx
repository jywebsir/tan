import React, { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import { useImmer } from 'use-immer'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Button from '../tan/components/button'
import Uploader from '../tan/components/uploader'
import UploaderFile from '../tan/components/uploader/uploader-file'

const UploadPage = () => {
	const [list, updateList] = useImmer({
		first: [],
		second: [],
		third: [
			{
				url: 'https://img.yzcdn.cn/vant/leaf.jpg',	
			},
			{
				url: 'https://img.yzcdn.cn/vant/tree.jpg',	
			}
		],
		fourth: [
			{
				url: 'https://img.yzcdn.cn/vant/leaf.jpg',	
			},	
		],
		fifth: [],
		sixth: [],
		seventh: [
			{
				url: 'https://img.yzcdn.cn/vant/leaf.jpg',	
				deletable: false
			},	
		],
		eighth: [
			{
        url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        status: 'uploading',
        message: '上传中',
      },
      {
        url: 'https://img.yzcdn.cn/vant/tree.jpg',
        status: 'failed',
        message: '上传失败',
      },
		],
		ninth: [],
		tenth: [],
		eleventh: []
	})

	const onBeforeRead = useMemoizedFn((event) => {
		const { file, callback } = event

		const isValid = file.type === 'video'

		if (!isValid) {
			wx.showToast({ title: '前置检查：只可上传视频', icon: 'none' });
		}

		callback(isValid)
	})

	const onAfterRead = useMemoizedFn((event) => {
		const { file, name } = event

		updateList(draft => {
			draft[name]= draft[name].concat(file)
		})
	})

	const onDelete = useMemoizedFn((event) => {
		const { index, name } = event

		updateList(draft => {
			draft[name].splice(index, 1)
		})
	})

	const onClickPreview = useMemoizedFn((event) => {
		wx.showToast({ title: '点击预览项', icon: 'none' });
	})

	const onOverSize = useMemoizedFn(() => {
		wx.showToast({ title: '大小应小于500kb', icon: 'none' });
	})

	return (
		<DemoPage style={{background: '#FFFFFF'}}>
			<DemoBlock title="基础用法" padding>
				<Uploader 
					name="first"
					fileList={list.first}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>
			</DemoBlock>

			<DemoBlock title="限制上传格式为视频" padding>
				<Uploader 
					name="second"
					accept="video"
					fileList={list.second}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>
			</DemoBlock>

			<DemoBlock title="文件预览" padding>
				<Uploader 
					name="third"
					accept="file"
					fileList={list.third}
					multiple
					onAfterRead={onAfterRead}
					onDelete={onDelete}
					onClickPreview={onClickPreview}
				/>	
			</DemoBlock>

			<DemoBlock title="上传状态" padding>
				<Uploader 
					name="eighth"
					fileList={list.eighth}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="上传前置处理" padding>
				<Uploader 
					name="ninth"
					accept="all"
					fileList={list.ninth}
					useBeforeRead
					onBeforeRead={onBeforeRead}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="限制上传数量为2" padding>
				<Uploader 
					name="fourth"
					fileList={list.fourth}
					maxCount={2}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="显示上传大小为500kb" padding>
				<Uploader 
					name="fifth"
					fileList={list.fifth}
					maxSize={500*1024}
					onOverSize={onOverSize}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="开启多选" padding>
				<Uploader 
					name="tenth"
					fileList={list.tenth}
					multiple
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="自定义上传样式" padding>
				<Uploader 
					name="sixth"
					fileList={list.sixth}
					customUpload={
						<Button icon="plus" type="primary">上传文件</Button>
					}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="自定义上传图标与文字" padding>
				<Uploader 
					name="eleventh"
					fileList={list.eleventh}
					uploadIcon="plus"
					uploadText="上传文件"
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>		
			</DemoBlock>

			<DemoBlock title="禁用文件上传" padding>
				<Uploader 
					disabled
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>			
			</DemoBlock>

			<DemoBlock title="设置图片不可删除" padding>
				<Uploader 
					name="seventh"
					fileList={list.seventh}
					onAfterRead={onAfterRead}
					onDelete={onDelete}
				/>	
			</DemoBlock>
		</DemoPage>
	)
}

export default UploadPage 