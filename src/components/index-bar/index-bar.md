# IndexBar 索引栏 

### 介绍

用于列表的索引分类显示和快速定位。

## 代码演示

### 基础用法

点击索引栏时，会自动跳转到对应的锚点位置。

```html
<IndexBar>
	<IndexBar.Group index="A">
		<Cell title="文本" />
		<Cell title="文本" />
		<Cell title="文本" />
	</IndexBar.Group>

	<IndexBar.Group index="B">
		<Cell title="文本" />
		<Cell title="文本" />
		<Cell title="文本" />
	</IndexBar.Group>

	<IndexBar.Group index="C">
		<Cell title="文本" />
		<Cell title="文本" />
		<Cell title="文本" />
	</IndexBar.Group>

	...
</IndexBar>
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
