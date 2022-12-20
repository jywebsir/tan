import { useState } from 'react'
import { usePageScroll } from '@tarojs/taro'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import DemoSpace from '../components/demo-space'
import PullRefresh from '@/components/pull-refresh'
import style from '../styles/pull-refresh-page.modules.scss'

function BasicPullRefresh() {
  const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)
  const [reachTop, setReachTop] = useState(true)
	
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))

  return (
    <PullRefresh
      loading={loading}
      reachTop={reachTop}
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setCounter(counter + 1)
          setLoading(false)
        }, 1000)
      }}
    >
      <view className={style.content}>{counter ? "刷新次数：" + counter : "下拉试试"}</view>
    </PullRefresh>
  )
}

function CustomTextPullRefresh() {
	const [loading, setLoading] = useState(false)
  const [counter, setCounter] = useState(0)
  const [reachTop, setReachTop] = useState(true)
	
  usePageScroll(({ scrollTop }) => setReachTop(scrollTop === 0))	

	return (
    <PullRefresh
      loading={loading}
      reachTop={reachTop}
			loadingText="玩命加载中.."
			pullingText="下拉可以刷新哦~"
			releasingText="释放就可加载.."
			completedText="已刷新成功~"
      onRefresh={() => {
        setLoading(true)
        setTimeout(() => {
          setCounter(counter + 1)
          setLoading(false)
        }, 1000)
      }}
    >
      <view className={style.content}>{counter ? "刷新次数：" + counter : "下拉试试"}</view>
    </PullRefresh>
  )	
}

const PullRefreshPage = () => {
	const [active, setActive] = useState('basic')

	const onChange = (event) => {
		const { tab } = event.currentTarget.dataset

		setActive(tab)
	}

	return (
		<DemoPage className={style.container}>
			<DemoSpace align="center" className={style.menu}>
				<view 
					className={active === 'basic' && style.actived}
					data-tab="basic"
					onTap={onChange}
				>基本用法</view>

				<view 
					className={active === 'customText' && style.actived}
					data-tab="customText"
					onTap={onChange}
				>自定义提示</view>
			</DemoSpace>

			{
				active === 'basic'
				&&
				<BasicPullRefresh />	
			}

			{
				active === 'customText'
				&&
				<CustomTextPullRefresh />				
			}

		</DemoPage>
	)
}

export default PullRefreshPage