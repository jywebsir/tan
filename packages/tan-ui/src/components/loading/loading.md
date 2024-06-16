# Loading 加载

### 介绍

加载图标，用于表示加载中的过渡状态。

## 代码演示

### 加载类型

```html
<Loading />
<Loading type="spinner" />
```

### 自定义颜色

```html
<Loading className={style.customColor} />
```

```css
.customColor {
  --loading-spinner-color: #1989fa;
}
```

### 加载文案

```html
<Loading>加载中...</Loading>
```

### 垂直排列

```html
<Loading vertical>加载中...</Loading>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `spinner` | _string_ | `circular` |
| vertical | 是否垂直排列图标和文字内容 | _boolean_ | `false` |

### CSS 变量

| 属性 | 说明 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --loading-spinner-color | 图标颜色 | `#c8c9cc` | `--tan-loading-spinner-color` |
| --loading-spinner-size | 图标大小 | `60px` | `--tan-loading-spinner-size` |
| --loading-spinner-animation-duration | 图标旋转动画duration | `0.8s` | `--tan-loading-spinner-animation-duration` |
| --loading-text-spacing | 文字与图标之间的间距 | `36px` | `--tan-loading-text-spacing` |
| --loading-text-color | 文字颜色 | `#969799` | `--tan-loading-text-color` |
| --loading-text-font-size | 文字大小 | `28px` | `--tan-loading-text-font-size` |
| --loading-text-line-height | 文字行高 | `40px` | `--tan-loading-text-line-height` |
