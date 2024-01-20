# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 引入

```javascript
import { Button } from 'tan'
```

## 代码演示

### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`。

```html
<Button type="default">默认按钮</Button>
<Button type="primary">主要按钮</Button>
<Button type="info">信息按钮</Button>
<Button type="warning">警告按钮</Button>
<Button type="danger">危险按钮</Button>
```

### 朴素按钮

通过`plain`属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<Button plain type="primary">朴素按钮</Button>
<Button plain type="info">朴素按钮</Button>
```

### 细边框

设置`hairline`属性可以开启 0.5px 边框，基于伪类实现。

```html
<Button plain hairline type="primary">细边框按钮</Button>
<Button plain hairline type="info">细边框按钮</Button>
```

### 禁用状态

通过`disabled`属性来禁用按钮，此时按钮的`bind:click`事件不会触发。

```html
<Button disabled type="primary">禁用状态</Button>
<Button disabled type="info">禁用状态</Button>
```

### 加载状态

```html
<Button loading type="primary" />
<Button loading type="primary" loadingType="spinner" />
<Button loading type="info" loadingText="加载中..." />
```

### 按钮形状

```html
<Button square type="primary">方形按钮</Button>
<Button round type="info">圆形按钮</Button>
```

### 图标按钮

通过`icon`属性设置按钮图标，支持 Icon 组件里的所有图标，也可以传入图标 URL。

```html
<Button icon="star-o" type="primary" />
<Button icon="star-o" type="primary">按钮</Button>
<Button icon="https://img.yzcdn.cn/vant/logo.png" type="info">
  按钮
</Button>
```

### 按钮尺寸

支持`large`、`normal`、`small`、`mini`四种尺寸，默认为`normal`。

```html
<Button type="primary" size="large">大号按钮</Button>
<Button type="primary" size="normal">普通按钮</Button>
<Button type="primary" size="small">小型按钮</Button>
<Button type="primary" size="mini">迷你按钮</Button>
```

### 块级元素

通过`block`属性可以将按钮的元素类型设置为块级元素。

```html
<Button type="primary" block>块级元素</Button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| id | 标识符 | _string_ | - |
| type | 按钮类型，可选值为 `primary` `info` `warning` `danger` | _string_ | `default` |
| size | 按钮尺寸，可选值为 `normal` `large` `small` `mini` | _string_ | `normal` |
| color `v1.0.0` | 按钮颜色，支持传入`linear-gradient`渐变色 | _string_ | - |
| icon | 左侧图标名称或图片链接，可选值见 [Icon 组件](#/icon) | _string_ | - |
| classPrefix | 图标类名前缀，同 Icon 组件的 [class-prefix 属性](#/icon) | _string_ | `van-icon` |
| plain | 是否为朴素按钮 | _boolean_ | `false` |
| block | 是否为块级元素 | _boolean_ | `false` |
| round | 是否为圆形按钮 | _boolean_ | `false` |
| square | 是否为方形按钮 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 边框 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| loadingText | 加载状态提示文字 | _string_ | - |
| loadingType | 加载状态图标类型，可选值为 `spinner` | _string_ | `circular` |
| loadingSize | 加载图标大小 | _string_ | `20px` |
| openType | 微信开放能力，具体支持可参考 [微信官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/button.html) | _string_ | - |
| appParameter | 打开 APP 时，向 APP 传递的参数 | _string_ | - |
| lang | 指定返回用户信息的语言，zh_CN 简体中文，<br>zh_TW 繁体中文，en 英文 | _string_ | `en` |
| sessionFrom | 会话来源 | _string_ | - |
| businessId | 客服消息子商户 id | _number_ | - |
| sendMessageTitle | 会话内消息卡片标题 | _string_ | 当前标题 |
| sendMessagePath | 会话内消息卡片点击跳转小程序路径 | _string_ | 当前分享路径 |
| sendMessageImg | sendMessageImg | _string_ | 截图 |
| showMessageCard | 显示会话内消息卡片 | _string_ | `false` |
| dataset | 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值 | _any_ | - |
| formType | 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件 | _string_ | - |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| onClick | 点击按钮，且按钮状态不为加载或禁用时触发 | - |
| onGetuserinfo | 用户点击该按钮时，会返回获取到的用户信息，<br>从返回参数的 detail 中获取到的值同 wx.getUserInfo | - |
| onContact | 客服消息回调 | - |
| onGetphonenumber | 获取用户手机号回调 | - |
| onError | 当使用开放能力时，发生错误的回调 | - |
| onOpensetting | 在打开授权设置页后回调 | - |
| onChooseavatar | 当 open-type 的值为 chooseAvatar 时，选择头像之后的回调 |

> Button 提供的是 click 事件而不是原生 tap 事件，按钮禁用时，click 事件不会触发，tap 事件依然会触发。

