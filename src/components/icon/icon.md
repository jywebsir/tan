# Icon 图标

### 介绍

基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用。


## 代码演示

### 基础用法

`Icon`的`name`属性支持传入图标名称或图片链接。

```html
<Icon name="close" />
<Icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
```

### 提示信息

设置`dot`属性后，会在图标右上角展示一个小红点。设置`info`属性后，会在图标右上角展示相应的徽标。

```html
<Icon name="chat" dot />
<Icon name="chat" info="9" />
<Icon name="chat" info="99+" />
```

### 图标颜色 / 大小

通过css变量来进行图表颜色与大小的设置。


```html
<Icon name="chat" className={style.icon} />
```

```css
.icon {
	--size: 48px;	
	--color: #DDDDDD;
}
```

### 自定义图标

如果需要在现有 Icon 的基础上使用更多图标，可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用。例如，可以在 `app.css` 文件中引入。

```css
/* 引入第三方或自定义的字体图标样式 */
@font-face {
  font-family: 'my-icon';
  src: url('./my-icon.ttf') format('truetype');
}

.my-icon {
  font-family: 'my-icon';
}

.my-icon-extra::before {
  content: '\e626';
}
```

```html
<!-- 通过 class-prefix 指定类名为 my-icon -->
<Icon classPrefix="my-icon" name="extra" />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称或图片链接 | _string_ | - |
| dot | 是否显示图标右上角小红点 | _boolean_ | `false` |
| info | 图标右上角文字提示 | _string \| number_ | - |
| classPrefix | 类名前缀 | _string_ | `van-icon` |

### Events

| 事件名     | 说明           | 参数 |
| ---------- | -------------- | ---- |
| onClick | 点击图标时触发 | -    |

### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --size | 图标大小 | 36px | `--tan-icon-size` |
| --color | 图标颜色 | #323233 | `-tan-icon-color` |

## 常见问题

### 开发者工具上提示 Failed to load font 是什么情况？

这个是开发者工具本身的问题，可以忽略，具体可以查看[微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/ui/font/wx.loadFontFace.html) - 注意事项第 5 条。
