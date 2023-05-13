import React from 'react'
import DemoBlock from '../components/demo-block'
import DemoPage from '../components/demo-page'
import Button from '@/components/button'
import Space from '@/components/space'
import style from '../styles/button-page.module.scss'

const ButtonPage = () => {
  return (
    <DemoPage>
      <DemoBlock
        title="按钮类型"
        padding
      >
        <Space>
          <Button>默认按钮</Button>
          <Button type="primary">主要按钮</Button>
          <Button type="info">信息按钮</Button>
          <Button type="danger">危险按钮</Button>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="朴素按钮"
        padding
      >
        <Space>
          <Button type="primary" plain>朴素按钮</Button>
          <Button type="info" plain>朴素按钮</Button>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="细边框"
        padding
      >
        <Space>
          <Button type="primary" plain hairline>细边框按钮</Button>
          <Button type="info" plain hairline>细边框按钮</Button>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="禁用状态"
        padding
      >
        <Space>
          <Button type="primary" disabled>禁用状态</Button>
          <Button type="info" disabled>禁用状态</Button>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="加载状态"
        padding
      >
        <Space>
          <Button type="primary" loading />
          <Button type="primary" loadingType="spinner" loading />
          <Button type="info" loadingText="加载中..." loading />
        </Space>
      </DemoBlock>

      <DemoBlock
        title="按钮形状"
        padding
      >
        <Space>
          <Button type="primary" square>方形按钮</Button>
          <Button type="info" round>圆形按钮</Button>
        </Space>
      </DemoBlock>

      <DemoBlock
        title="按钮尺寸"
        padding
      >

        <Button type="primary" size="large" block>大号按钮</Button>

        <Space className={style.row}>
          <Button type="primary">普通按钮</Button>
          <Button type="primary" size="small">小号按钮</Button>
          <Button type="primary" size="mini">迷你按钮</Button>
        </Space>
      </DemoBlock>
    </DemoPage>
  )
}

export default ButtonPage
