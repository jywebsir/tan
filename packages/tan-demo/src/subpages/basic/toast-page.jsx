import { useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import DemoBlock from '../../components/demo-block'
import DemoPage from '../../components/demo-page'
import Button from '@/components/button'
import Toast from '@/components/toast'

const ToastPage = () => {
	return (
		<DemoPage>
			<Toast 
				message="文字提示" 
				show
			/>
		</DemoPage>
	)
}

export default ToastPage